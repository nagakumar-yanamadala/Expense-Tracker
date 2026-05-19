import { PieChart } from "@mui/x-charts/PieChart";
import { useSelector } from "react-redux";

export default function BasicPie() {
  const transactions = useSelector((state) => state.transactions);

  const expenseCategories = [];

  transactions.forEach((item) => {
    if (item.isExpense) {
      expenseCategories.push(item);
    }
  });

  const data = [];

  expenseCategories.forEach((item, index) => {
    data.push({
      id: index,
      value: Number(item.Amount),
      label: item.Category.name,
      color: item.Category.color.primary,
    });
  });

  return (
    <div>
      <div
        style={{
          marginBottom: "1rem",
        }}
      >
        <h2
          style={{
            fontSize: "1.3rem",
            fontWeight: "700",
            color: "#0F172A",
            marginBottom: "4px",
          }}
        >
          Expense Breakdown
        </h2>

        <p
          style={{
            color: "#64748B",
            fontSize: "0.92rem",
          }}
        >
          Category-wise spending overview
        </p>
      </div>

      <PieChart
        series={[
          {
            data: data,
            innerRadius: 60,
            paddingAngle: 3,
            cornerRadius: 5,
          },
        ]}
        width={420}
        height={380}
      />
    </div>
  );
}
