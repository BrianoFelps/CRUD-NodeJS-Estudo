-- CreateTable
CREATE TABLE "public"."tokens" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "clientId" INTEGER NOT NULL,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."tokens" ADD CONSTRAINT "tokens_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "public"."clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
