-- Create quizzes table
CREATE TABLE IF NOT EXISTS quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  points_per_question INTEGER NOT NULL DEFAULT 5,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create questions table
CREATE TABLE IF NOT EXISTS questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  options JSONB NOT NULL, -- Array of strings
  correct_answer INTEGER NOT NULL, -- Index of the correct option
  explanation TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create quiz_attempts table
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  points_earned INTEGER NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Quizzes are readable by everyone authenticated
CREATE POLICY "Quizzes are viewable by everyone" ON quizzes
  FOR SELECT USING (auth.role() = 'authenticated');

-- Questions are readable by everyone authenticated
CREATE POLICY "Questions are viewable by everyone" ON questions
  FOR SELECT USING (auth.role() = 'authenticated');

-- Quiz attempts: Users can view their own attempts
CREATE POLICY "Users can view own attempts" ON quiz_attempts
  FOR SELECT USING (auth.uid() = user_id);

-- Quiz attempts: Users can insert their own attempts
CREATE POLICY "Users can insert own attempts" ON quiz_attempts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Trigger to update user points on quiz completion
CREATE OR REPLACE FUNCTION handle_quiz_completion()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE profiles
  SET points = points + NEW.points_earned
  WHERE id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_quiz_completed
  AFTER INSERT ON quiz_attempts
  FOR EACH ROW
  EXECUTE FUNCTION handle_quiz_completion();

-- Insert Mock Data
DO $$
DECLARE
  q1_id UUID;
  q2_id UUID;
  q3_id UUID;
BEGIN
  -- Quiz 1
  INSERT INTO quizzes (title, description, icon, points_per_question)
  VALUES ('Dasar Pengelolaan Sampah', 'Pelajari konsep dasar pengelolaan sampah yang berkelanjutan', '♻️', 5)
  RETURNING id INTO q1_id;

  INSERT INTO questions (quiz_id, question_text, options, correct_answer, explanation, "order") VALUES
  (q1_id, 'Apa yang dimaksud dengan sampah organik?', '["Sampah yang berasal dari makhluk hidup yang dapat terurai secara alami", "Sampah yang berasal dari plastik dan logam", "Sampah yang berasal dari rumah sakit", "Sampah yang tidak dapat didaur ulang"]'::jsonb, 0, 'Sampah organik adalah sampah yang berasal dari makhluk hidup seperti sisa makanan, daun, ranting, dan sejenisnya yang dapat terurai secara alami oleh mikroorganisme.', 1),
  (q1_id, 'Berapa lama waktu yang dibutuhkan plastik untuk terurai di alam?', '["5-10 tahun", "100-200 tahun", "Tidak dapat terurai", "50 tahun"]'::jsonb, 2, 'Plastik sangat sulit terurai di alam dan dapat membutuhkan waktu ratusan tahun atau bahkan tidak terurai sama sekali, menjadikannya salah satu sampah paling berbahaya.', 2),
  (q1_id, 'Apa manfaat utama mendaur ulang sampah?', '["Mengurangi biaya pembuangan sampah saja", "Menghemat sumber daya alam dan mengurangi pencemaran lingkungan", "Membuat sampah hilang sepenuhnya", "Hanya untuk industri besar"]'::jsonb, 1, 'Mendaur ulang sampah membantu menghemat sumber daya alam yang terbatas, mengurangi emisi karbon, dan meminimalkan dampak pencemaran lingkungan.', 3);

  -- Quiz 2
  INSERT INTO quizzes (title, description, icon, points_per_question)
  VALUES ('Jenis-Jenis Sampah dan Penanganannya', 'Kenali berbagai jenis sampah dan cara penanganannya yang benar', '🗑️', 5)
  RETURNING id INTO q2_id;

  INSERT INTO questions (quiz_id, question_text, options, correct_answer, explanation, "order") VALUES
  (q2_id, 'Berapa lama waktu yang dibutuhkan kertas untuk terurai?', '["2-6 minggu", "1-2 bulan", "6 bulan", "1 tahun"]'::jsonb, 0, 'Kertas biasanya terurai dalam 2-6 minggu di alam, menjadikannya salah satu sampah organik yang mudah didegradasi.', 1),
  (q2_id, 'Kaleng aluminium dapat didaur ulang berapa kali tanpa mengurangi kualitas?', '["Hanya 1-2 kali", "Maksimal 5 kali", "Unlimited/Tidak terbatas", "10 kali"]'::jsonb, 2, 'Kaleng aluminium dapat didaur ulang berkali-kali tanpa mengurangi kualitasnya, hanya membutuhkan 5% energi dibandingkan membuat baru dari bauksit.', 2);

  -- Quiz 3
  INSERT INTO quizzes (title, description, icon, points_per_question)
  VALUES ('Ekonomi Sirkular dan Gaya Hidup Berkelanjutan', 'Memahami ekonomi sirkular dan cara hidup yang berkelanjutan untuk masa depan', '🌍', 5)
  RETURNING id INTO q3_id;

  INSERT INTO questions (quiz_id, question_text, options, correct_answer, explanation, "order") VALUES
  (q3_id, 'Apa yang dimaksud dengan ekonomi sirkular?', '["Ekonomi yang hanya fokus pada pertumbuhan GDP", "Sistem ekonomi yang meminimalkan limbah dengan terus mendaur ulang dan menggunakan kembali produk", "Ekonomi yang tidak berkaitan dengan lingkungan", "Sistem ekonomi linier tradisional"]'::jsonb, 1, 'Ekonomi sirkular adalah model ekonomi yang dirancang untuk menghilangkan pemborosan melalui daur ulang berkelanjutan, penggunaan kembali, dan desain produk yang lebih baik.', 1);

END $$;
