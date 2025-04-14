-- CreateTable
CREATE TABLE "ob_User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255),

    CONSTRAINT "ob_User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ob_Post" (
    "userId" VARCHAR(255) NOT NULL,
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "likes" INTEGER NOT NULL,

    CONSTRAINT "ob_Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ob_Image" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "publicId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    "postId" TEXT,

    CONSTRAINT "ob_Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ob_Comment" (
    "id" TEXT NOT NULL,
    "text" VARCHAR(255) NOT NULL,
    "likes" INTEGER NOT NULL,
    "postId" TEXT NOT NULL,
    "parentCommentId" TEXT,

    CONSTRAINT "ob_Comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ob_User_username_key" ON "ob_User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "ob_Image_userId_key" ON "ob_Image"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ob_Image_postId_key" ON "ob_Image"("postId");

-- AddForeignKey
ALTER TABLE "ob_Post" ADD CONSTRAINT "ob_Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "ob_User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ob_Image" ADD CONSTRAINT "ob_Image_userId_fkey" FOREIGN KEY ("userId") REFERENCES "ob_User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ob_Image" ADD CONSTRAINT "ob_Image_postId_fkey" FOREIGN KEY ("postId") REFERENCES "ob_Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ob_Comment" ADD CONSTRAINT "ob_Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "ob_Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ob_Comment" ADD CONSTRAINT "ob_Comment_parentCommentId_fkey" FOREIGN KEY ("parentCommentId") REFERENCES "ob_Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
