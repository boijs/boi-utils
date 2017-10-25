const Ora = require('ora');
const Chalk = require('chalk');

/**
 * @module boi/util/log
 */
module.exports = {
  /**
   * @desc print success message
   * @param {string} content message text
   */
  success: content => {
    Ora().succeed(Chalk.green(content));
  },
  /**
   * @desc print error message
   * @param {string} content message text
   */
  error: content => {
    Ora().fail(Chalk.red(content));
  },
  /**
   * @desc print warning message
   * @param {string} content message text
   */
  warn: content => {
    Ora().warn(Chalk.yellow(content));
  },
  /**
   * @desc start loading, stop and execute callbacks after promise fulfills
   * @param {Promise} action action promise
   * @param {string} content loading message
   * @param {Function} callback callback when promise has been resolved
   * @return {Promise}
   */
  loading: (action,content,callback) => {
    if(!action||typeof action.then !== 'function'){
      Ora().fail('Invalid parameter for util/log/loading');
    }
    const Spinner = Ora(Chalk.green(content)).start();
    return action.then(({msg,data}) => {
      Spinner.succeed(Chalk.green(msg));
      typeof callback === 'function' && callback(data);
    }).catch(msg => {
      Spinner.fail(Chalk.red(msg));
    });
  },
};