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

{
  type OneNum = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  type Year = `20${Day}`;
  type Month =
    | "01"
    | "02"
    | "03"
    | "04"
    | "05"
    | "06"
    | "07"
    | "08"
    | "09"
    | "10"
    | "11"
    | "12";
  type Day =
    | `0${OneNum}`
    | "10"
    | `1${OneNum}`
    | "20"
    | `2${OneNum}`
    | "30"
    | "31";

  // Note: The "string &" is required only for the type error to state:
  // Argument of type "2025-10-40" is not assignable to parameter of type 'DateStringLiteral'
  // Without the "string &" the error reads: Argument ... to parameter of type "2001-01-01" | "2001-01-02" | ... "2031-12-31";
  type DateStringLiteral = string & `${Year}-${Month}-${Day}`;

  // Note: Ofcorse this type permits us to have the 31st of February as a proper date. We need to be more specific to capture that case as well.

  function checkDate(date: DateStringLiteral) {}

  checkDate("2024-02-10");
  // checkDate("2025-02-40"); // Type Error
  // checkDate("2025-02-04 20:40:11+03:00T"); // Type Error
}
