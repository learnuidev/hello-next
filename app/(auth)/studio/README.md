# Studio

Studio is where authors can manage Content Series

Features

1. Series Management

   - Add new series
   - Update existing series
   - Add new content to series

2. Content Management

   - Manage content transcriptions
   - Content Pipeline

## Series Creation Flow

A dedicated, standalone page with a premium, minimal aesthetic—clean typography, generous spacing, and a focused layout that prioritizes clarity over clutter.

User Journey
Title – Prompt the user to enter the series title.

Description – Provide context or an overview of the series.

Topic Type – Select the relevant topic category.

Source Selection

Choose from an existing list of sources.

If the source does not exist, allow the user to create a new one inline.

Photo Upload

Upload occurs at the end of the flow.

Generate a presigned URL via S3, upload the file, then save the asset and store the returned asset ID.

Summary & Review

Display a clean summary of all inputs before final submission.

Requirements
Validation: Implement schema validation using Zod to ensure data integrity across all steps.

UI Quality: The interface should feel intentional and high-end—avoid generic AI-generated aesthetics. Use ample whitespace, subtle borders, restrained shadows, and a clear visual hierarchy.

Flow Integrity: Steps should be intuitive, with clear progress indication and the ability to navigate between steps without losing state.

Sidebar Navigation: Include a persistent sidebar that displays all steps with their current status:

Complete – Show a green checkmark icon for steps that have been fully filled out and validated.

In Progress / Pending – Show a yellow icon (e.g., exclamation mark or warning symbol) with a tooltip or helper text explaining what information is still needed or incomplete.

Active – Clearly highlight the current step to orient the user within the flow.

Clicking any step in the sidebar should navigate the user directly to that step, preserving any already-entered data.

UI/UX & Animation: The overall look, feel, and motion design should be consistent with the new-home-page aesthetic—smooth transitions, subtle micro-interactions, thoughtful easing curves, and a polished, cohesive experience that feels modern and deliberate, not generic or template-driven.
