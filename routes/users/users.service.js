const bcrypt = require('bcrypt');
const { prisma } = require('../../db/prisma');

function findUserByEmail(email) {
    return prisma.user.findUnique({
        where: {
            email,
        },
        include: {
            user_location: {
                include: {
                    location: {
                        select: {
                            location: true
                        }
                    }
                }
            }
        }
    });
}

function createUserByEmailAndPassword(user) {
    console.log({ user })
    user.password = bcrypt.hashSync(user.password, 12);
    return prisma.user.create({
        data: user,
    });
}

function findUserById(id) {
    return prisma.user.findUnique({
        where: {
            id,
        },
    });
}
function linkLocationToUser(data) {
    console.log("linkLocationToUser", { data })
    return prisma.user_location.create({
        data
    })
}

function getAllLocations() {
    return prisma.location.findMany()
}

function saveDataToForm1(data, userId) {
    console.log({ data })
    return prisma.form1.create({
        data: {
            ...data,
            user_id: userId
        }
    })
}
async function exportData(data) {
    let res = await prisma.form1.findMany({
        where: {
            location_id: data?.location_id
        },
        include: {
            location: {
                select: {
                    location: true
                }
            },
            user: {
                select: {
                    name: true,
                    phone_number: true
                }
            }
        }
    })

    result = res.map(obj => {
        const { user, location, ...rest } = obj;
        return { ...rest, ...user, ...location };
    });

    console.log("res", result)

    return result
}


const getMetricsForm1 = async (location_id) => {
    try {
        return prisma.form1.findMany({
            where: {
                location_id
            }
        })
    } catch (error) {
        console.log(error)
    }
}




module.exports = {
    findUserByEmail,
    findUserById,
    createUserByEmailAndPassword,
    linkLocationToUser,
    getAllLocations,
    saveDataToForm1,
    exportData,
    getMetricsForm1
};