WITH inserted_institution AS (
  INSERT INTO institutions(timestamp) VALUES(now())
  RETURNING id AS inserted_id
), insterted_info AS (
  INSERT INTO institution_info(institution_id, name, contact_email) 
  SELECT inserted_id, :name, :contact_email FROM inserted_institution
  RETURNING institution_id AS inserted_id
)
INSERT INTO institution_status(institution_id) 
SELECT inserted_id FROM insterted_info;
