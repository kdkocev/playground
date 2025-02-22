{
  const someUrl = "/entity/:entityId/";
  const longUrl = "/entity/:entityId/attr/:attrId/";
  const longlongUrl = "/a/:a/b/:b/c/:c/d/:d/";

  const reverse1 = <P extends { [key: string]: string | number }>(
    url: string,
    params: P,
  ) => {
    let reversedUrl = url;
    (Object.keys(params) as Array<keyof P>).forEach(
      (key: string) =>
        (reversedUrl = reversedUrl.replace(":" + key, params[key].toString())),
    );
    return reversedUrl;
  };

  const response = reverse1(someUrl, { entityId: 1 });

  console.log(response);

  const isParamInString = <
    P extends string,
    T extends `${string}:${P}/${string}`,
  >(
    str: T,
    param: P,
  ) => {};

  isParamInString(someUrl, "entityId");

  const isParamInStr2 = <T, P extends string>(
    url: T extends `${string}:${P}/${string}` ? T : never,
    param: P,
  ) => {};

  isParamInStr2(someUrl, "entityId");

  const f1 = <U extends string, P extends string>(
    url: U extends `${string}:${P}/${string}` ? U : never,
    param: P,
  ) => {};

  f1(someUrl, "entityId");

  type T1<U, P extends string = string> = U extends `${string}:${P}/${string}`
    ? P
    : never;

  let t1: T1<typeof someUrl, "entityId">;

  type T2<U> = U extends `${string}:${infer P}/${string}` ? P : never;

  let t2: T2<typeof someUrl>;
  let t2_2: T2<typeof longUrl>; // not yet there. It doesn't return all params

  type T3<U> =
    U extends `${string}/:${infer P1}/${string}/:${infer P2}/${string}`
      ? P1 | P2
      : never;

  let t3: T3<typeof longUrl>;
  // This solution is doable for N parameters, but can it be written better?

  // U is such a string that has ${string}${P}${U}
  // perhaps a helper type that checks the proper stuff is in order here
  // like the member one in prolog: member(X, [X, _]). && member(X, [_, T]) -: member(X, T).
  type T4_1<U, P> = U extends `${string}:${infer P}/${string}` ? P : never;
  type T4<U> = U extends `${string}:${infer P}/${infer T}` ? P | T4<T> : never;

  let t4: T4<typeof longlongUrl>;

  // actually ... no helper function needed:
  type T5<U> = U extends `${string}:${infer P}/${infer T}` ? P | T5<T> : never;

  let t5: T5<typeof longlongUrl>;

  // And now for the reverse func
  enum URLS {
    PROFILE_PAGE = "/user/:userId/profile/",
    COMPANY_PRODUCT_PAGE = "/comapny/:companyId/product/:productId/",
  }

  type P2<U> = { [P in T5<U>]: string | number };
  const reverse2 = <T extends URLS>(url: T, params: P2<T>) => {};

  reverse2(URLS.COMPANY_PRODUCT_PAGE, { companyId: 1, productId: 2 });

  // But the error here is unrecognisable when you make a mistake
  // let's try again:

  const reverse3 = <T extends URLS, K extends T5<T>>(
    url: T,
    params: Record<K, any>,
  ) => {};

  reverse3(URLS.COMPANY_PRODUCT_PAGE, { companyId: 1, productId: 2 });

  // This is way better, but I still want to list only the keys
  // let's try again

  const reverse4 = <U extends URLS>(
    url: U,
    params: { [K in T5<U>]: string | number },
  ) => {};
  // let params4 = { companyId: 1, productId: 2 };
  // reverse4(URLS.PROFILE_PAGE, params4);
  // error TS2345: Argument of type '{ companyId: number; productId: number; }' is not assignable to parameter of type '{ userId: string | number; }'.
  // reverse4(URLS.PROFILE_PAGE, { companyId: 1, productId: 2 });
  // error TS2353: Object literal may only specify known properties, and 'companyId' does not exist in type '{ userId: string; }'.

  reverse4(URLS.PROFILE_PAGE, { userId: 5 });
  reverse4(URLS.COMPANY_PRODUCT_PAGE, { companyId: 1, productId: 2 });

  // perfect!

  // Also if you type in "reverse4(URLS.PROFILE_PAGE, {" you get the correct suggestion on the type
}

{
  // ideas from reddit https://www.reddit.com/r/typescript/comments/17mzmjr/recursive_mapped_type_generic/
  type Flatten<T> =
    T extends Record<string, unknown>
      ? {
          // Flatten property values recursively.
          [K in keyof T]: Flatten<T[K]> extends infer F
            ? // Avoid distributing unions: https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types
              [F] extends [Record<string, unknown>]
              ? // Property value is an object; use key remapping and template literals to compute the flattened keys:
                // https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#key-remapping-via-as
                // https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html
                {
                  [L in keyof F as K extends string
                    ? L extends string
                      ? `${K}_${L}`
                      : never
                    : never]: F[L];
                }
              : // Property value is not an object; leave it unchanged:
                { [L in K]: F }
            : never;
          // Get a union of all the property values of this temporary type, which represents the objects we want to merge:
        }[keyof T] extends infer U
        ? // Union to intersection: https://stackoverflow.com/a/50375286
          (U extends unknown ? (arg: U) => void : never) extends (
            arg: infer I,
          ) => void
          ? // Convert the intersection of objects into a single object:
            { [K in keyof I]: I[K] }
          : never
        : never
      : // Base case: don't flatten non-objects.
        T;

  let o = { a: { b: { c: 1, d: "2" } } };
  let a: Flatten<typeof o>;
}

{
  type FlattenHelper<P extends string, T> = [T] extends [
    Record<string, unknown>,
  ]
    ? {
        [K in keyof T]: K extends string
          ? FlattenHelper<P extends "" ? K : `${P}_${K}`, T[K]>
          : never;
      }[keyof T]
    : { [K in P]: T };

  type Flatten<T> =
    T extends Record<string, unknown>
      ? FlattenHelper<"", T> extends infer U
        ? (U extends unknown ? (arg: U) => void : never) extends (
            arg: infer I,
          ) => void
          ? { [K in keyof I]: I[K] }
          : never
        : never
      : T;
}
