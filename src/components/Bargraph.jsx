import { BarChart } from "@mui/x-charts/BarChart";
import { useSelector } from "react-redux";

export default function IncomeExpenseChart() {
  const transactions = useSelector((state) => state.transactions);

  const monthMap = {};

  transactions.forEach((item) => {
    const [day, month, year] = item.Date.split("-");

    const monthName = new Date(year, month - 1).toLocaleString("default", {
      month: "short",
    });

    if (!monthMap[monthName]) {
      monthMap[monthName] = {
        income: 0,
        expense: 0,
      };
    }

    if (item.isExpense) {
      monthMap[monthName].expense += Number(item.Amount);
    } else {
      monthMap[monthName].income += Number(item.Amount);
    }
  });

  const months = Object.keys(monthMap);

  const incomeData = months.map((month) => monthMap[month].income);

  const expenseData = months.map((month) => monthMap[month].expense);

  return (
    <div
      style={{
        width: "100%",
      }}
    >
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
          Income vs Expense
        </h2>

        <p
          style={{
            color: "#64748B",
            fontSize: "0.92rem",
          }}
        >
          Monthly financial comparison
        </p>
      </div>

      <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: months,
          },
        ]}
        series={[
          {
            data: incomeData,
            label: "Income",
            color: "#22C55E",
          },
          {
            data: expenseData,
            label: "Expense",
            color: "#6366F1",
          },
        ]}
        height={350}
        borderRadius={10}
      />
    </div>
  );
}
