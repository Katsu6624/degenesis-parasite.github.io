CREATE TABLE IF NOT EXISTS characters (
  id TEXT PRIMARY KEY,
  pseudo TEXT NOT NULL,
  character_data TEXT NOT NULL,
  secret_hash TEXT NOT NULL,
  cult TEXT,
  culture TEXT,
  concept TEXT,
  character_name TEXT,
  description TEXT NOT NULL DEFAULT '',
  report_count INTEGER NOT NULL DEFAULT 0,
  hidden INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_characters_cult ON characters(cult);
CREATE INDEX IF NOT EXISTS idx_characters_culture ON characters(culture);
CREATE INDEX IF NOT EXISTS idx_characters_concept ON characters(concept);
CREATE INDEX IF NOT EXISTS idx_characters_created_at ON characters(created_at);
CREATE INDEX IF NOT EXISTS idx_characters_hidden ON characters(hidden);

CREATE TABLE IF NOT EXISTS reports (
  id TEXT PRIMARY KEY,
  character_id TEXT NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL
);
