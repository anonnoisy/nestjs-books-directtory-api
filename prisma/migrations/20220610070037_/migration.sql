/*
  Warnings:

  - The primary key for the `AuthorsOnBooks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `CategoriesOnBooks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `assignedBy` on the `AuthorsOnBooks` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `assignedBy` on the `CategoriesOnBooks` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "AuthorsOnBooks" DROP CONSTRAINT "AuthorsOnBooks_pkey",
DROP COLUMN "assignedBy",
ADD COLUMN     "assignedBy" INTEGER NOT NULL,
ADD CONSTRAINT "AuthorsOnBooks_pkey" PRIMARY KEY ("bookId", "authorId", "assignedBy");

-- AlterTable
ALTER TABLE "CategoriesOnBooks" DROP CONSTRAINT "CategoriesOnBooks_pkey",
DROP COLUMN "assignedBy",
ADD COLUMN     "assignedBy" INTEGER NOT NULL,
ADD CONSTRAINT "CategoriesOnBooks_pkey" PRIMARY KEY ("bookId", "categoryId", "assignedBy");

-- AddForeignKey
ALTER TABLE "AuthorsOnBooks" ADD CONSTRAINT "AuthorsOnBooks_assignedBy_fkey" FOREIGN KEY ("assignedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnBooks" ADD CONSTRAINT "CategoriesOnBooks_assignedBy_fkey" FOREIGN KEY ("assignedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
