-- Insert Dummy Rewards Data
-- Run this in Supabase SQL Editor

INSERT INTO public.rewards (name, description, points_cost, image_url) VALUES
('Voucher Listrik 20k', 'Token listrik senilai Rp 20.000', 2000, '⚡'),
('Pulsa All Operator 10k', 'Pulsa reguler untuk semua operator senilai Rp 10.000', 1000, '📱'),
('Minyak Goreng 1L', 'Minyak goreng kemasan premium 1 liter', 1500, '🍳'),
('Uang Tunai Rp 50.000', 'Uang tunai langsung cair', 5000, '💵'),
('Tumbler Eksklusif', 'Botol minum stainless steel ramah lingkungan', 3000, '🥤'),
('Totebag Canvas', 'Tas belanja ramah lingkungan bahan kanvas tebal', 1200, '👜'),
('Bibit Tanaman Buah', 'Paket bibit tanaman buah (Mangga/Jeruk/Jambu)', 800, '🌱'),
('Sabun Cuci Piring', 'Sabun cuci piring cair kemasan 750ml', 500, '🧼');
