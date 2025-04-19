-- CreateTable
CREATE TABLE "Oww_Coords" (
    "id" TEXT NOT NULL,
    "character" TEXT NOT NULL,
    "xMin" INTEGER NOT NULL,
    "xMax" INTEGER NOT NULL,
    "yMin" INTEGER NOT NULL,
    "yMax" INTEGER NOT NULL,

    CONSTRAINT "Oww_Coords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Oww_LeaderBoard" (
    "id" TEXT NOT NULL,
    "player" TEXT NOT NULL,
    "timeTaken" TEXT NOT NULL,

    CONSTRAINT "Oww_LeaderBoard_pkey" PRIMARY KEY ("id")
);
