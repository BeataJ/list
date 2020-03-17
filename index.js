#!/usr/bin/env node

const fs = require('fs');
const util = require('util');
const chalk = require('chalk');

// Method #2
// const lstat = util.promisify(fs.lstat);

// Method #3
const { lstat } = fs.promises;

// console.log(process.argv);

fs.readdir(process.cwd(), async (err, filenames) => {
  if (err) {
    // throw new Error(err)
    console.log(err);
  }

  const statPromieses = filenames.map(filename => {
    return lstat(filename);
  });

  const allStats = await Promise.all(statPromieses);

  for (let stats of allStats) {
    const index = allStats.indexOf(stats);

    if (stats.isFile()) {
      console.log(chalk.blue(filenames[index]));
    } else {
      console.log(chalk.bold.red(filenames[index]));
    }
  }

  // for (let filename of filenames) {
  //   try {
  //     const stats = await lstat(filename);

  //     console.log(filename, stats.isFile());
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
});

// Method #1
// const lstat = filename => {
//   return new Promise((resolve, reject) => {
//     fs.lstat(filename, (err, stats) => {
//       if (err) {
//         reject(err);
//       }

//       resolve(stats);
//     });
//   });
// };
