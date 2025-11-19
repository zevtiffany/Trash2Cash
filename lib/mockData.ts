export type Role = "household" | "waste_bank" | "government";

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: Role;
  points: number;
}

export interface WasteTransaction {
  id: string;
  userId: string; // Household user ID
  wasteBankId: string; // Waste Bank user ID
  type: string;
  weight: number; // in Kg
  pointsEarned: number;
  date: string;
}

export interface Reward {
  id: string;
  name: string;
  pointsCost: number;
  description: string;
  image: string;
}

export const MOCK_USERS: User[] = [
  {
    id: "u1",
    name: "Budi Santoso",
    email: "budi@warga.com",
    password: "123",
    role: "household",
    points: 50,
  },
  {
    id: "u2",
    name: "Bank Sampah Maju Jaya",
    email: "admin@maju.com",
    password: "123",
    role: "waste_bank",
    points: 0,
  },
  {
    id: "u3",
    name: "Dinas Lingkungan Hidup",
    email: "admin@dlh.go.id",
    password: "123",
    role: "government",
    points: 0,
  },
];

export const MOCK_REWARDS: Reward[] = [
  {
    id: "r1",
    name: "Voucher Listrik 20k",
    pointsCost: 200,
    description: "Token listrik prabayar senilai Rp 20.000",
    image: "⚡",
  },
  {
    id: "r2",
    name: "Pulsa All Operator 10k",
    pointsCost: 100,
    description: "Pulsa reguler untuk semua operator",
    image: "📱",
  },
  {
    id: "r3",
    name: "Minyak Goreng 1L",
    pointsCost: 150,
    description: "Minyak goreng kemasan premium 1 liter",
    image: "🍳",
  },
  {
    id: "r4",
    name: "Uang Tunai Rp 50.000",
    pointsCost: 500,
    description: "Transfer ke dompet digital (GoPay/OVO)",
    image: "💵",
  },
];

export const MOCK_TRANSACTIONS: WasteTransaction[] = [
  {
    id: "t1",
    userId: "u1",
    wasteBankId: "u2",
    type: "Plastik",
    weight: 2.5,
    pointsEarned: 25,
    date: "2023-10-25",
  },
  {
    id: "t2",
    userId: "u1",
    wasteBankId: "u2",
    type: "Kertas",
    weight: 5,
    pointsEarned: 50,
    date: "2023-10-26",
  },
];
