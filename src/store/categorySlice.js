import { createSlice } from "@reduxjs/toolkit";

export const pieChartColors = [
  {
    primary: "#4F46E5",
    background: "#E0E7FF",
  },
  {
    primary: "#6366F1",
    background: "#EAEAFE",
  },
  {
    primary: "#818CF8",
    background: "#EEF2FF",
  },
  {
    primary: "#3B82F6",
    background: "#DBEAFE",
  },
  {
    primary: "#60A5FA",
    background: "#E0F2FE",
  },
  {
    primary: "#2563EB",
    background: "#DBEAFE",
  },
  {
    primary: "#0EA5E9",
    background: "#E0F7FF",
  },
  {
    primary: "#38BDF8",
    background: "#E0F2FE",
  },
  {
    primary: "#06B6D4",
    background: "#CFFAFE",
  },
  {
    primary: "#22D3EE",
    background: "#ECFEFF",
  },

  {
    primary: "#14B8A6",
    background: "#CCFBF1",
  },
  {
    primary: "#2DD4BF",
    background: "#D1FAE5",
  },
  {
    primary: "#10B981",
    background: "#D1FAE5",
  },
  {
    primary: "#34D399",
    background: "#ECFDF5",
  },
  {
    primary: "#22C55E",
    background: "#DCFCE7",
  },

  {
    primary: "#84CC16",
    background: "#ECFCCB",
  },
  {
    primary: "#A3E635",
    background: "#F7FEE7",
  },

  {
    primary: "#EAB308",
    background: "#FEF9C3",
  },
  {
    primary: "#FACC15",
    background: "#FEFCE8",
  },
  {
    primary: "#F59E0B",
    background: "#FEF3C7",
  },

  {
    primary: "#FB923C",
    background: "#FFEDD5",
  },
  {
    primary: "#F97316",
    background: "#FFEDD5",
  },

  {
    primary: "#EF4444",
    background: "#FEE2E2",
  },
  {
    primary: "#F87171",
    background: "#FEE2E2",
  },

  {
    primary: "#EC4899",
    background: "#FCE7F3",
  },
  {
    primary: "#F472B6",
    background: "#FDF2F8",
  },

  {
    primary: "#D946EF",
    background: "#FAE8FF",
  },
  {
    primary: "#C084FC",
    background: "#F3E8FF",
  },

  {
    primary: "#8B5CF6",
    background: "#EDE9FE",
  },
  {
    primary: "#A78BFA",
    background: "#F5F3FF",
  },
];

const initialState = [
  {
    id: 1,
    name: "Food at Restaurant",
    icon: "FaUtensils",
    color: pieChartColors[19], 
  },
  {
    id: 2,
    name: "Salary",
    icon: "FaMoneyBill",
    color: pieChartColors[12], 
  },
  {
    id: 3,
    name: "Netflix Subscription",
    icon: "FaFilm",
    color: pieChartColors[22], 
  },
  {
    id: 4,
    name: "Electricity Bill",
    icon: "FaBolt",
    color: pieChartColors[17], 
  },
  {
    id: 5,
    name: "Petrol",
    icon: "FaCar",
    color: pieChartColors[3], 
  },
];

const categorySlice = createSlice({
  name: "categories",

  initialState,

  reducers: {
    addCategory: (state, action) => {
      state.unshift({
        id: Date.now(),
        name: action.payload.name,
        icon: action.payload.icon,
        color: action.payload.color,
      });
    },

    deleteCategory: (state, action) => {
      return state.filter(
        (item) => item.id !== action.payload,
      );
    },
  },
});

export const {
  addCategory,
  deleteCategory,
} = categorySlice.actions;

export default categorySlice.reducer;