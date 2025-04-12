import dayjs from "dayjs";
{
  //import dayjs from "dayjs";

  type IDate = string & { __format: "YYYY-MM-DD" };

  type IDatetime = string & { __format: "YYYY-MM-DDTHH:mm:ssZ[Z]" };

  function dateParse(date: IDate) {
    return dayjs(date, "YYYY-MM-DD");
  }

  function datetimeParse(datetime: IDatetime) {
    return dayjs(datetime, "YYYY-MM-DDTHH:mm:ssZ[Z]");
  }

  const test1: IDate = "2024-12-04" as IDate;
  const test2: IDatetime = "2024-12-04T12:32:45-02:00Z" as IDatetime;

  console.log(dateParse(test1));

  console.log(datetimeParse(test2));

  //console.log(dateParse(test2));
}

{
  type Currency<T> = number & { __currency: T };

  type EUR = Currency<"EUR">;

  type BGN = Currency<"BGN">;

  const value1 = 12 as BGN;
  const value2 = 24 as EUR;

  function eurToBgn(value: EUR): BGN {
    return (value * 1.955) as BGN;
  }

  function bgnToEur(value: BGN): EUR {
    return (value * 0.51) as EUR;
  }

  console.log(bgnToEur(value1) - value2);

  //console.log(eurToBgn(value1) - value2);
  console.log(value1 - eurToBgn(value2));

  console.log(eurToBgn((bgnToEur(value1) - value2) as EUR));
}

{
  type Branded<T, Brand> = T & { __brand: Brand };

  type Currency<C> = Branded<number, C>;

  type USD = Currency<"USD">;

  const value1 = 12 as USD;

  console.log(value1);
}
