import prisma from "@/libs/prismadb";

interface IParams {
    orderId?: string
}

export async function getOrderById({ orderId }: IParams) {
    try {
        const order = await prisma.order.findUnique({
            where: {
                id: orderId
            }
        })
        if (!order) {
            return null
        }
        return order
    } catch (error: any) {
        throw new Error(error)
    }

}