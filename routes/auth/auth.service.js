
const { prisma } = require('../../db/prisma');
const { hashToken } = require('../../config/hashToken');

// used when we create a refresh token.
function addRefreshTokenToWhitelist({ jti, refreshToken, userId }) {
    return prisma.refreshToken.create({
        data: {
            id: jti,
            hashedToken: hashToken(refreshToken),
            userId
        },
    });
}

// used to check if the token sent by the client is in the database.
function findRefreshTokenById(id) {
    return prisma.refreshToken.findUnique({
        where: {
            id,
        },
    });
}

// soft delete tokens after usage.
function deleteRefreshToken(id) {
    return prisma.refreshToken.update({
        where: {
            id,
        },
        data: {
            revoked: true
        }
    });
}

function revokeTokens(userId) {
    return prisma.refreshToken.updateMany({
        where: {
            userId
        },
        data: {
            revoked: true
        }
    });
}

module.exports = {
    addRefreshTokenToWhitelist,
    findRefreshTokenById,
    deleteRefreshToken,
    revokeTokens
};