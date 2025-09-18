CREATE TABLE `libraryReservation` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`studentId` text NOT NULL,
	`library` text NOT NULL,
	`room` text NOT NULL,
	`roomNumber` text NOT NULL,
	`date` text NOT NULL,
	`time` text NOT NULL,
	`duration` text NOT NULL,
	`participants` text NOT NULL,
	`createdAt` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
