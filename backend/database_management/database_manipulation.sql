-- SELECT CURRENT_TIMESTAMP
-- SELECT * FROM "BANKS"

SELECT ID, COMPENSATION_CODE, INSTITUTION_NAME FROM "BANKS"

TRUNCATE TABLE "BANKS"
ALTER SEQUENCE "BANKS_id_seq" RESTART WITH 1
