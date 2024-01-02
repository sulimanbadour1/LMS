const { PrismaClient } = require('@prisma/client')

const database = new PrismaClient()

async function main() {
    try {
        await database.category.createMany({
            data: [
                { name: "Computer Science" },
                { name: "Mathematics" },
                { name: "Physics" },
                { name: "Computer Engineering" },
                { name: "Languages" },
                { name: "Engineering" },
                { name: "Life Style" },
            ]
        })

        console.log("Categories seeded successfully")

    } catch (error) {
        console.log("Error seeding database categories: ", error)
    }
    finally {
        await database.$disconnect()
    }
}

main()