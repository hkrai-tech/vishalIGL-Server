-- AlterTable
ALTER TABLE "user_location" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "form1" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "location_id" INTEGER,
    "shift_incharge_name" TEXT,
    "zone" TEXT,
    "control_room" TEXT,
    "Date" TIMESTAMP(3),
    "valve_number" TEXT,
    "valve_size" TEXT,
    "MDPE_length" TEXT,
    "loc_name" TEXT,
    "mdpe_length" TEXT,
    "Condition" BOOLEAN,
    "cleanliness" BOOLEAN,
    "proper_sand_availability" BOOLEAN,
    "paint_on_chamber_lid" BOOLEAN,
    "construction_condition_of_chamber_and_lid" BOOLEAN,
    "remarks" TEXT,

    CONSTRAINT "form1_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "form1" ADD CONSTRAINT "form1_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form1" ADD CONSTRAINT "form1_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
