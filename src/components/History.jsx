import TransactionItem from "./TransactionItem";
import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import "./Styles/TransactionItem.css";

function History() {
  const transactions = useSelector((state) => state.transactions);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("latest");

  const filteredTransactions = useMemo(() => {
    let filtered = [...transactions];

    // search filter
    filtered = filtered.filter((transaction) => {
      const query = search.toLowerCase();

      return (
        transaction.Category?.name?.toLowerCase().includes(query) ||
        transaction.Wallet?.name?.toLowerCase().includes(query) ||
        transaction.Date?.toLowerCase().includes(query)
      );
    });

    // type filter
    if (typeFilter === "expense") {
      filtered = filtered.filter((transaction) => transaction.isExpense);
    }

    if (typeFilter === "income") {
      filtered = filtered.filter((transaction) => !transaction.isExpense);
    }

    // sorting
    if (sortBy === "highest") {
      filtered.sort((a, b) => b.Amount - a.Amount);
    }

    if (sortBy === "lowest") {
      filtered.sort((a, b) => a.Amount - b.Amount);
    }

    if (sortBy === "latest") {
      filtered.reverse();
    }

    return filtered;
  }, [transactions, search, typeFilter, sortBy]);

  return (
    <div className="container py-4" style={{ maxWidth: "900px" }}>
      <h1 className="text-center fw-bold my-4 text-dark history-title">
        Transaction History
      </h1>

      {/* FILTERS */}
      <div className="card filter-card p-3 mb-4">
        <div className="row g-3">
          {/* SEARCH */}
          <div className="col-12 col-md-5">
            <input
              type="text"
              className="form-control"
              placeholder="Search category, wallet or date..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* TYPE FILTER */}
          <div className="col-6 col-md-3">
            <select
              className="form-select"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Transactions</option>
              <option value="expense">Expenses</option>
              <option value="income">Income</option>
            </select>
          </div>

          {/* SORT */}
          <div className="col-6 col-md-4">
            <select
              className="form-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="latest">Latest First</option>
              <option value="highest">Highest Amount</option>
              <option value="lowest">Lowest Amount</option>
            </select>
          </div>
        </div>
      </div>

      {/* RESULTS */}
      <div className="d-flex flex-column gap-3">
        {filteredTransactions.length === 0 ? (
          <div className="card filter-card p-5 text-center border-0">
            <h5 className="fw-semibold text-muted">No transactions found</h5>
            <p className="text-secondary mb-0">
              Try changing search or filters.
            </p>
          </div>
        ) : (
          filteredTransactions.map((transaction) => (
            <TransactionItem transaction={transaction} key={transaction.Id} />
          ))
        )}
      </div>
    </div>
  );
}

export default History;
