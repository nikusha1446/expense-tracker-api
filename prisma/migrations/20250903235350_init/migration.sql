-- CreateEnum
CREATE TYPE "public"."expense_category" AS ENUM ('GROCERIES', 'LEISURE', 'ELECTRONICS', 'UTILITIES', 'CLOTHING', 'HEALTH', 'OTHERS');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."expenses" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "amount" DECIMAL(10,2) NOT NULL,
    "category" "public"."expense_category" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "expenses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE INDEX "expenses_userId_idx" ON "public"."expenses"("userId");

-- CreateIndex
CREATE INDEX "expenses_date_idx" ON "public"."expenses"("date");

-- CreateIndex
CREATE INDEX "expenses_category_idx" ON "public"."expenses"("category");

-- CreateIndex
CREATE INDEX "expenses_userId_date_idx" ON "public"."expenses"("userId", "date");

-- AddForeignKey
ALTER TABLE "public"."expenses" ADD CONSTRAINT "expenses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
