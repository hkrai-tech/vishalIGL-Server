/*
  Warnings:

  - The primary key for the `form1` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `location` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user_location` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "RefreshToken" DROP CONSTRAINT "RefreshToken_userId_fkey";

-- DropForeignKey
ALTER TABLE "form1" DROP CONSTRAINT "form1_location_id_fkey";

-- DropForeignKey
ALTER TABLE "form1" DROP CONSTRAINT "form1_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_location" DROP CONSTRAINT "user_location_location_id_fkey";

-- DropForeignKey
ALTER TABLE "user_location" DROP CONSTRAINT "user_location_user_id_fkey";

-- AlterTable
ALTER TABLE "RefreshToken" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "form1" DROP CONSTRAINT "form1_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ALTER COLUMN "location_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "form1_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "form1_id_seq";

-- AlterTable
ALTER TABLE "location" DROP CONSTRAINT "location_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "location_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "location_id_seq";

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "user_id_seq";

-- AlterTable
ALTER TABLE "user_location" DROP CONSTRAINT "user_location_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ALTER COLUMN "location_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "user_location_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "user_location_id_seq";

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_location" ADD CONSTRAINT "user_location_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_location" ADD CONSTRAINT "user_location_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form1" ADD CONSTRAINT "form1_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form1" ADD CONSTRAINT "form1_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
