import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useListWeeklyLearnedCharacters } from "./use-list-weekly-learned-characters";

const NewCharactersTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const currentPayload = payload[0]?.payload;
    const newCharacters = currentPayload?.newCharacters?.join("");
    return (
      <div className="custom-tooltip">
        {newCharacters?.length ? (
          <p> {`${newCharacters} (${newCharacters?.length})`}</p>
        ) : null}
      </div>
    );
  }

  return null;
};

export const WeeklyBarChart = () => {
  const { data } = useListWeeklyLearnedCharacters();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        {/* <CartesianGrid /> */}
        <XAxis dataKey={"day"} />
        <YAxis />

        <Tooltip content={<NewCharactersTooltip />} />
        {/* <Area type="monotone" dataKey="total" stroke="#8884d8" fill="#8884d8" /> */}
        <Bar type="monotone" dataKey="count" stroke="#00AB66" fill="#00AB66" />
      </BarChart>
    </ResponsiveContainer>
  );
};
