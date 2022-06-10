/*
  Warnings:

  - The primary key for the `AuthorsOnBooks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `CategoriesOnBooks` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "AuthorsOnBooks" DROP CONSTRAINT "AuthorsOnBooks_assignedBy_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnBooks" DROP CONSTRAINT "CategoriesOnBooks_assignedBy_fkey";

-- AlterTable
ALTER TABLE "AuthorsOnBooks" DROP CONSTRAINT "AuthorsOnBooks_pkey",
ALTER COLUMN "assignedBy" SET DATA TYPE TEXT,
ADD CONSTRAINT "AuthorsOnBooks_pkey" PRIMARY KEY ("bookId", "authorId", "assignedBy");

-- AlterTable
ALTER TABLE "CategoriesOnBooks" DROP CONSTRAINT "CategoriesOnBooks_pkey",
ALTER COLUMN "assignedBy" SET DATA TYPE TEXT,
ADD CONSTRAINT "CategoriesOnBooks_pkey" PRIMARY KEY ("bookId", "categoryId", "assignedBy");
