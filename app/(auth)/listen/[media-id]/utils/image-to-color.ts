"use client";

// @ts-ignore
import _types from "@webgpu/types";

interface ImageToColorOptions {
  sampleSize?: number;

  format?: GPUTextureFormat;
}

function formatRgbA({ avgR, avgG, avgB, avgA }: any) {
  return `rgba(${(avgR * 255).toFixed(0)},${(avgG * 255).toFixed(0)},${(avgB * 255).toFixed(0)},${avgA.toFixed(0)})`;
}

async function imageToColorWebGL(
  imageUrl: string,
  options: ImageToColorOptions = {}
): Promise<string> {
  const { sampleSize = 10, format = "rgba8unorm" } = options;

  try {
    // Check if WebGPU is supported

    if (!navigator.gpu) {
      throw new Error("WebGPU is not supported in this browser");
    }

    // Request adapter and device

    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter) {
      throw new Error("No appropriate GPUAdapter found");
    }

    const device = await adapter.requestDevice();

    // Load and decode the image
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch image: ${response.status} ${response.statusText}`
      );
    }

    const blob = await response.blob();
    const imageBitmap = await createImageBitmap(blob);

    // Create a canvas to read pixel data (fallback method since WebGPU readback is complex)
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Could not get 2D context");
    }

    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;
    ctx.drawImage(imageBitmap, 0, 0);

    console.log("BIT MAP", imageBitmap);
    // Get image data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    console.log("image data", imageData);

    // Calculate average color with sampling
    let totalR = 0,
      totalG = 0,
      totalB = 0,
      totalA = 0;
    let sampleCount = 0;

    for (let y = 0; y < imageBitmap.height; y += sampleSize) {
      for (let x = 0; x < imageBitmap.width; x += sampleSize) {
        const index = (y * imageBitmap.width + x) * 4;
        totalR += data[index];
        totalG += data[index + 1];
        totalB += data[index + 2];
        totalA += data[index + 3];
        sampleCount++;
      }
    }

    // Calculate averages and normalize to 0-1 range
    const avgR = totalR / sampleCount / 255;
    const avgG = totalG / sampleCount / 255;
    const avgB = totalB / sampleCount / 255;
    const avgA = totalA / sampleCount / 255;

    // Return formatted rgba string with 4 decimal places
    return formatRgbA({ avgR, avgG, avgB, avgA });
  } catch (error) {
    console.error("Error processing image:", error);
    throw error;
  }
}

// Alternative WebGPU version (more complex but uses WebGPU as requested)
async function imageToColorWebGPU(
  imageUrl: string,
  options: ImageToColorOptions = {}
): Promise<string> {
  const { sampleSize = 10, format = "rgba8unorm" } = options;

  try {
    if (!navigator.gpu) {
      throw new Error("WebGPU is not supported in this browser");
    }

    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter) {
      throw new Error("No appropriate GPUAdapter found");
    }

    const device = await adapter.requestDevice();

    // Load image
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch image: ${response.status} ${response.statusText}`
      );
    }

    const blob = await response.blob();
    const imageBitmap = await createImageBitmap(blob);

    // Create texture
    const texture = device.createTexture({
      size: [imageBitmap.width, imageBitmap.height],
      format,

      usage: GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT,
    });

    // Copy image to texture
    device.queue.copyExternalImageToTexture(
      { source: imageBitmap },
      { texture },
      [imageBitmap.width, imageBitmap.height]
    );

    // Create output buffer
    const outputBufferSize = imageBitmap.width * imageBitmap.height * 4;
    const outputBuffer = device.createBuffer({
      size: outputBufferSize,

      usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
    });

    // Create compute pipeline to process the texture
    const computeShaderCode = `
        @group(0) @binding(0) var inputTexture: texture_2d<f32>;
        @group(0) @binding(1) var<storage, read_write> outputBuffer: array<f32>;
  
        @compute @workgroup_size(1)
        fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
          let width = textureDimensions(inputTexture).x;
          let height = textureDimensions(inputTexture).y;
          let x = global_id.x;
          let y = global_id.y;
          
          if (x >= width || y >= height) {
            return;
          }
          
          let color = textureLoad(inputTexture, vec2<i32>(i32(x), i32(y)), 0);
          let index = (y * width + x) * 4u;
          
          outputBuffer[index] = color.r;
          outputBuffer[index + 1] = color.g;
          outputBuffer[index + 2] = color.b;
          outputBuffer[index + 3] = color.a;
        }
      `;

    const computePipeline = device.createComputePipeline({
      layout: "auto",
      compute: {
        module: device.createShaderModule({
          code: computeShaderCode,
        }),
        entryPoint: "main",
      },
    });

    // Create bind group
    const bindGroup = device.createBindGroup({
      layout: computePipeline.getBindGroupLayout(0),
      entries: [
        {
          binding: 0,
          resource: texture.createView(),
        },
        {
          binding: 1,
          resource: {
            buffer: outputBuffer,
          },
        },
      ],
    });

    // Dispatch compute work
    const commandEncoder = device.createCommandEncoder();
    const passEncoder = commandEncoder.beginComputePass();
    passEncoder.setPipeline(computePipeline);
    passEncoder.setBindGroup(0, bindGroup);
    passEncoder.dispatchWorkgroups(imageBitmap.width, imageBitmap.height);
    passEncoder.end();

    // Copy texture to buffer
    commandEncoder.copyTextureToBuffer(
      {
        texture,
        mipLevel: 0,
        origin: { x: 0, y: 0, z: 0 },
      },
      {
        buffer: outputBuffer,
        bytesPerRow: imageBitmap.width * 4,
        rowsPerImage: imageBitmap.height,
      },
      {
        width: imageBitmap.width,
        height: imageBitmap.height,
        depthOrArrayLayers: 1,
      }
    );

    device.queue.submit([commandEncoder.finish()]);

    // Map buffer and read data

    await outputBuffer.mapAsync(GPUMapMode.READ);
    const arrayBuffer = outputBuffer.getMappedRange();
    const data = new Float32Array(arrayBuffer);

    // Calculate average color
    let totalR = 0,
      totalG = 0,
      totalB = 0,
      totalA = 0;
    let sampleCount = 0;

    for (let y = 0; y < imageBitmap.height; y += sampleSize) {
      for (let x = 0; x < imageBitmap.width; x += sampleSize) {
        const index = (y * imageBitmap.width + x) * 4;
        totalR += data[index];
        totalG += data[index + 1];
        totalB += data[index + 2];
        totalA += data[index + 3];
        sampleCount++;
      }
    }

    const avgR = totalR / sampleCount;
    const avgG = totalG / sampleCount;
    const avgB = totalB / sampleCount;
    const avgA = totalA / sampleCount;

    outputBuffer.unmap();
    texture.destroy();
    outputBuffer.destroy();

    return formatRgbA({ avgR, avgG, avgB, avgA });
  } catch (error) {
    console.error("Error processing image with WebGPU:", error);
    // Fallback to canvas method
    return imageToColor(imageUrl, options);
  }
}

export const imageToColor = async (
  imageUrl: string,
  options: ImageToColorOptions = {}
) => {
  try {
    console.info("SUCCESS");
    return await imageToColorWebGL(imageUrl, options);
  } catch (err) {
    console.warn(`Error when trying with web gl. Trying with webgpu`);
    return await imageToColorWebGPU(imageUrl, options);
  }
};
