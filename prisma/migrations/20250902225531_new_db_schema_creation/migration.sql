-- CreateTable
CREATE TABLE "public"."boughtByUser" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "boughtByUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."boughtByUser" ADD CONSTRAINT "boughtByUser_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "public"."clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."boughtByUser" ADD CONSTRAINT "boughtByUser_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
