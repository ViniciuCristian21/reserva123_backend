-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "rooms" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "reservations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "check_in" DATETIME NOT NULL,
    "check_out" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "amount" DECIMAL NOT NULL,
    "id_user" TEXT,
    "id_room" TEXT,
    CONSTRAINT "reservations_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "reservations_id_room_fkey" FOREIGN KEY ("id_room") REFERENCES "rooms" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "amount" DECIMAL NOT NULL,
    "payment_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "payment_type" TEXT NOT NULL,
    "id_reservation" TEXT,
    CONSTRAINT "payments_id_reservation_fkey" FOREIGN KEY ("id_reservation") REFERENCES "reservations" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
