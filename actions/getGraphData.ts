import moment from "moment";
import prisma from "@/libs/prismadb";

export default async function getGraphData() {
  try {
    // Get data for the last 7 days
    const startDate = moment().subtract(6, "days").startOf("day");
    const endDate = moment().endOf("day");

    // query the database to get order grouped by createDate
    let result: any;
    try {
      result =
        (await prisma?.order.groupBy({
          by: ["createDate"],
          where: {
            createDate: {
              gte: startDate.toDate(),
              lte: endDate.toDate(),
            },
            status: "complete",
          },
          _sum: {
            amount: true,
          },
        })) || [];
    } catch (error) {
      console.log("groupBy failed, returning empty data", error);
      result = [];
    }

    // Initialise an object to aggregate the Data by day
    const aggregatedData: {
      [day: string]: { day: string; date: string; totalAmount: number };
    } = {};

    //Create a clone of the start date to iterate over each day
    const currentDate = startDate.clone();

    // Iterate over each day in the date range
    while (currentDate <= endDate) {
      // format the day as a string(e.g "Monday")
      const day = currentDate.format("dddd");
      console.log("day<<<", day, currentDate);

      //Initialise the aggregated data for the day with the day,date , totalAmount
      aggregatedData[day] = {
        day: day,
        date: currentDate.format("YYYY-MM-DD"),
        totalAmount: 0,
      };
      // Move to the next day
      currentDate.add(1, "day");
    }

    if (result && Array.isArray(result)) {
      result.forEach((entry) => {
        const day = moment(entry.createDate).format("dddd");
        const amount = entry._sum.amount || 0;
        aggregatedData[day].totalAmount += amount;
      });
    }

    // convert the aggregatedData object to an array and sort it by date
    const formattedData = Object.values(aggregatedData).sort((a, b) =>
      moment(a.date).diff(moment(b.date)),
    );
    return formattedData;
  } catch (error: any) {
    console.error("Error getting graph data:", error);
    // Return empty array of last 7 days as fallback
    const aggregatedData: {
      [day: string]: { day: string; date: string; totalAmount: number };
    } = {};
    const startDate = moment().subtract(6, "days").startOf("day");
    const endDate = moment().endOf("day");
    const currentDate = startDate.clone();

    while (currentDate <= endDate) {
      const day = currentDate.format("dddd");
      aggregatedData[day] = {
        day: day,
        date: currentDate.format("YYYY-MM-DD"),
        totalAmount: 0,
      };
      currentDate.add(1, "day");
    }

    return Object.values(aggregatedData);
  }
}
