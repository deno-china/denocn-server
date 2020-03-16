export function lookupUser(field: string, as: string) {
  return {
    $lookup: {
      from: "users",
      let: { [field]: `$${field}` },
      as,
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: [`$_id`, `$$${field}`]
            }
          }
        },
        {
          $project: {
            name: 1,
            nick_name: 1,
            avatar: 1
          }
        }
      ]
    }
  };
}

export function lookupReply(field: string, as: string) {
  return {
    $lookup: {
      from: "replies",
      let: { [field]: `$${field}` },
      as,
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: [`$_id`, `$$${field}`]
            }
          }
        },
        lookupUser("author_id", "author"),
        { $unwind: "$author" }
      ]
    }
  };
}
