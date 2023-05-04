/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/***/ ((module) => {


/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.

  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }

  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.

    generator._invoke = makeInvokeMethod(innerFn, self, context);
    return generator;
  }

  exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.

  var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.


  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"); // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  exports.mark = function (genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }

    genFun.prototype = Object.create(Gp);
    return genFun;
  }; // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.


  exports.awrap = function (arg) {
    return {
      __await: arg
    };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;

        if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function (error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    } // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).


    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.

  exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;
    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        } // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;

        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);

          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;
        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);
        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;
        var record = tryCatch(innerFn, self, context);

        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };
        } else if (record.type === "throw") {
          state = GenStateCompleted; // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.

          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  } // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.


  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (!info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

      context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.

      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }
    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    } // The delegate iterator is finished, so forget it and continue with
    // the outer generator.


    context.delegate = null;
    return ContinueSentinel;
  } // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.


  defineIteratorMethods(Gp);
  define(Gp, toStringTagSymbol, "Generator"); // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.

  define(Gp, iteratorSymbol, function () {
    return this;
  });
  define(Gp, "toString", function () {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{
      tryLoc: "root"
    }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function (object) {
    var keys = [];

    for (var key in object) {
      keys.push(key);
    }

    keys.reverse(); // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.

    return function next() {
      while (keys.length) {
        var key = keys.pop();

        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      } // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.


      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];

      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;
          return next;
        };

        return next.next = next;
      }
    } // Return an iterator with no values.


    return {
      next: doneResult
    };
  }

  exports.values = values;

  function doneResult() {
    return {
      value: undefined,
      done: true
    };
  }

  Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      this.prev = 0;
      this.next = 0; // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.

      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;
      this.method = "next";
      this.arg = undefined;
      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },
    stop: function () {
      this.done = true;
      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;

      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;

      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },
    complete: function (record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },
    "catch": function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      } // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.


      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  }; // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.

  return exports;
}( // If this script is executing as a CommonJS module, use module.exports
// as the regeneratorRuntime namespace. Otherwise create a new empty
// object. Either way, the resulting object will be used to initialize
// the regeneratorRuntime variable at the top of this file.
 true ? module.exports : 0);

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}

/***/ }),

/***/ "./src/background/background.ts":
/*!**************************************!*\
  !*** ./src/background/background.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common */ "./src/background/common.ts");
/* harmony import */ var _modules_overlay_background__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/overlay/background */ "./src/modules/overlay/background.ts");
/* harmony import */ var _modules_network_background__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/network/background */ "./src/modules/network/background.ts");




/***/ }),

/***/ "./src/background/common.ts":
/*!**********************************!*\
  !*** ./src/background/common.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils/index.ts");
 // chrome.tabs.onUpdated.addListener((tab) => {
//     console.log('create tab', tab.id)
//     sendTabMessage(tab.id!, [tab.id!]);
// });

(0,_utils__WEBPACK_IMPORTED_MODULE_0__.onRuntimeMessage)('tabInfo', (data, sender, response) => {
  var _sender$tab;

  response((_sender$tab = sender.tab) === null || _sender$tab === void 0 ? void 0 : _sender$tab.id);
});

/***/ }),

/***/ "./src/modules/network/apiRule.ts":
/*!****************************************!*\
  !*** ./src/modules/network/apiRule.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "networkLifeCycle": () => (/* binding */ networkLifeCycle),
/* harmony export */   "networkRuleHandler": () => (/* binding */ networkRuleHandler)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "./src/utils/index.ts");

const networkLifeCycle = ['response'];
const storageKey = 'networkRules';

class NetworkRuleHandler {
  enable = false;

  async refresh() {
    const {
      enable,
      rules
    } = await (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getLocalStorage)(storageKey, {
      enable: false,
      rules: {}
    });
    this.allRules = rules;
    this.enable = enable;
  }

  async allNetworkRules() {
    if (!this.allRules) {
      await this.refresh();
    }

    return this.allRules;
  }

  setEnable(bool) {
    this.enable = bool;
    this.save();
  }

  async getNetworkRule(url) {
    var _this$allRules;

    let checkEnable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    await this.allNetworkRules();
    const rule = (_this$allRules = this.allRules) === null || _this$allRules === void 0 ? void 0 : _this$allRules[url];

    if (rule && checkEnable) {
      if (Object.keys(rule.rules).length === 0) {
        return undefined;
      }

      if (Object.values(rule.rules).every(requestRule => {
        const isEmpty = networkLifeCycle.every(life => {
          var _requestRule$life, _requestRule$life2;

          return !((_requestRule$life = requestRule[life]) !== null && _requestRule$life !== void 0 && _requestRule$life.enable) || !((_requestRule$life2 = requestRule[life]) !== null && _requestRule$life2 !== void 0 && _requestRule$life2.handlerFunctionScript.trim());
        });
        return isEmpty;
      })) {
        return undefined;
      }
    }

    return rule;
  }

  async ensureRule(url) {
    await this.allNetworkRules();
    let rule = await this.getNetworkRule(url);

    if (!rule) {
      rule = {
        url,
        rules: {}
      };
      this.allRules[url] = rule;
    }

    return rule;
  }

  getRequestUrlKey(requestUrl, baseUrl) {
    const parsedUrlObject = new URL(requestUrl, baseUrl);
    return `${parsedUrlObject.origin}${parsedUrlObject.pathname}`;
  }

  async configRuleRequest(url, requestUrl, requestRule, state) {
    const rule = await this.ensureRule(url);
    const parsedUrl = this.getRequestUrlKey(requestUrl, url);
    rule.rules[parsedUrl] = rule.rules[parsedUrl] ?? {
      url: requestUrl
    };
    const requestUrlRule = rule.rules[parsedUrl];
    requestUrlRule[state] = requestUrlRule[state] ?? {
      enable: true,
      handlerFunctionScript: ''
    };
    Object.assign(requestUrlRule[state], requestRule);
    this.save();
  }

  async save() {
    await (0,_utils__WEBPACK_IMPORTED_MODULE_0__.setLocalStorage)(storageKey, {
      enable: this.enable,
      rules: this.allRules ?? {}
    });
  }

  async forceSave(rules) {
    await (0,_utils__WEBPACK_IMPORTED_MODULE_0__.setLocalStorage)(storageKey, {
      enable: this.enable,
      rules: JSON.parse(rules) ?? {}
    });
  }

}

const networkRuleHandler = new NetworkRuleHandler();
(0,_utils__WEBPACK_IMPORTED_MODULE_0__.registerStorage)(storageKey, {
  onExport: async () => {
    const data = await (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getLocalStorage)(storageKey, {
      enable: false,
      rules: {}
    });
    return data;
  },
  onImport: async data => {
    await (0,_utils__WEBPACK_IMPORTED_MODULE_0__.setLocalStorage)(storageKey, data);
  }
});

/***/ }),

/***/ "./src/modules/network/background.ts":
/*!*******************************************!*\
  !*** ./src/modules/network/background.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "./src/utils/index.ts");
/* harmony import */ var _apiRule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./apiRule */ "./src/modules/network/apiRule.ts");


const watchingMap = new Set();

function getUrlRule(rule, requestUrl) {
  var _rule$rules$checkKey, _rule$rules$checkKey$, _rule$rules$checkKey2;

  let state = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'response';
  const checkKey = requestUrl.split('?')[0]; // if(checkKey.includes('/detail')){debugger}

  if (!(rule !== null && rule !== void 0 && (_rule$rules$checkKey = rule.rules[checkKey]) !== null && _rule$rules$checkKey !== void 0 && (_rule$rules$checkKey$ = _rule$rules$checkKey[state]) !== null && _rule$rules$checkKey$ !== void 0 && _rule$rules$checkKey$.enable)) {
    return undefined;
  }

  return (_rule$rules$checkKey2 = rule.rules[checkKey]) === null || _rule$rules$checkKey2 === void 0 ? void 0 : _rule$rules$checkKey2[state];
}

function hasJSONHeader(headers) {
  return headers.some(header => header.name.toLowerCase() === 'content-type' && header.value.includes('application/json'));
}

async function replaceResponse(requestParams, protoResponse, script) {
  const isResponseJSON = hasJSONHeader(requestParams.responseHeaders);
  const request = requestParams.request;
  const response = {
    code: requestParams.responseStatusCode,
    body: protoResponse.base64Encoded ? atob(protoResponse.body) : protoResponse.body,
    headers: requestParams.responseHeaders
  };

  if (isResponseJSON) {
    try {
      response.body = JSON.parse(response.body);
    } catch (e) {
      console.error(e);
    }
  }

  (0,_utils__WEBPACK_IMPORTED_MODULE_0__.evalScript)(script, {
    request,
    response
  });

  if (isResponseJSON) {
    response.body = JSON.stringify(response.body);
  }

  if (protoResponse.base64Encoded && typeof response.body === 'string') {
    response.body = btoa(response.body);
  }

  return response;
}

let currentDebuggee = undefined;
let currentDebugTab = undefined;
let currentRules = undefined;

async function hijackRequest(url, scriptRule, params) {
  chrome.debugger.sendCommand(currentDebuggee, 'Fetch.getResponseBody', {
    requestId: params.requestId
  }, async function (protoResponse) {
    const response = await replaceResponse(params, protoResponse, scriptRule.handlerFunctionScript);
    chrome.debugger.sendCommand(currentDebuggee, 'Fetch.fulfillRequest', {
      requestId: params.requestId,
      responseCode: response.code,
      responseHeaders: response.headers,
      body: response.body
    }, () => {
      console.log(`Request ${url} intercepted and modified.`);
    });
  });
}

async function hijackRule(tab) {
  chrome.debugger.getTargets(targets => {
    const target = targets.find(t => t.tabId === tab.id);

    if (!target) {
      console.warn('no target found');
      return;
    }

    currentDebuggee = {
      targetId: target.id
    };
    currentDebugTab = tab.id;
    chrome.debugger.attach(currentDebuggee, '1.2', () => {
      chrome.debugger.sendCommand(currentDebuggee, 'Network.enable', {});
      chrome.debugger.sendCommand(currentDebuggee, 'Fetch.enable', {
        patterns: [{
          requestStage: 'Response'
        }]
      }, () => {
        chrome.debugger.onEvent.addListener((source, method, params) => {
          if (source.targetId === target.id && method === 'Fetch.requestPaused') {
            const requestParam = params;
            const requestId = requestParam.requestId;
            const url = requestParam.request.url;
            const requestRule = getUrlRule(currentRules, url, 'response');

            if (!requestRule) {
              chrome.debugger.sendCommand(currentDebuggee, 'Fetch.continueRequest', {
                requestId
              });
              return;
            }

            hijackRequest(url, requestRule, requestParam);
          } // else {
          //     chrome.debugger.sendCommand({ tabId: tabId }, 'Fetch.continueRequest', {
          //         requestId: params.requestId,
          //     });
          // }

        });
      });
    });
  });
}

function detachDebug() {
  if (currentDebuggee) {
    chrome.debugger.detach(currentDebuggee);
  }

  currentDebuggee = undefined;
  watchingMap.delete(currentDebugTab);
  currentDebugTab = undefined;
}

async function updateHttpWatcher(tab) {
  _apiRule__WEBPACK_IMPORTED_MODULE_1__.networkRuleHandler.refresh();

  if (!_apiRule__WEBPACK_IMPORTED_MODULE_1__.networkRuleHandler.enable) {
    detachDebug();
    return;
  }

  if (!tab.url || !tab.id) {
    return;
  }

  let rules = await _apiRule__WEBPACK_IMPORTED_MODULE_1__.networkRuleHandler.getNetworkRule(tab.url, true);
  console.log('network rules', tab.id, tab.url, rules);

  if (!rules) {
    if (currentDebugTab === tab.id) {
      detachDebug();
    }

    return;
  }

  currentRules = rules;

  if (watchingMap.has(tab.id)) {
    return;
  }

  watchingMap.add(tab.id);
  hijackRule(tab);
}

const debounceUpdateHttpWatcher = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.debounce)(updateHttpWatcher, 500); // https://developer.chrome.com/docs/extensions/reference/webRequest/

chrome.tabs.onCreated.addListener(tab => {
  debounceUpdateHttpWatcher(tab);
});
chrome.tabs.onUpdated.addListener(async tabId => {
  const tab = await (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getTab)(tabId);
  debounceUpdateHttpWatcher(tab);
});
chrome.tabs.onRemoved.addListener(async tabId => {
  if (tabId === currentDebugTab) {
    detachDebug();
  }
});
_apiRule__WEBPACK_IMPORTED_MODULE_1__.networkRuleHandler.refresh();

/***/ }),

/***/ "./src/modules/overlay/background.ts":
/*!*******************************************!*\
  !*** ./src/modules/overlay/background.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "./src/utils/index.ts");
 // 存内存。关浏览器丢

const overlayMap = new Map();
console.log('capture background ready', overlayMap);
(0,_utils__WEBPACK_IMPORTED_MODULE_0__.onRuntimeMessage)('setOverlayCapture', (data, sender, response) => {
  let [currentTabId, captureData] = data; // console.log('setOverlayCapture', currentTabId);
  // 空的base64是 data:,

  if (!(captureData !== null && captureData !== void 0 && captureData.base64) || captureData.base64.length < 10) {
    overlayMap.delete(currentTabId);
  } else {
    overlayMap.set(currentTabId, captureData);
    response();
  } // console.log('sendTabMessage updateOverlayCapture', currentTabId, overlayMap.get(currentTabId));


  if (new URL(sender.origin ?? '').protocol === 'chrome-extension:') {
    (0,_utils__WEBPACK_IMPORTED_MODULE_0__.sendTabMessage)('updateOverlayCapture', currentTabId, [overlayMap.get(currentTabId)]);
  }
});
(0,_utils__WEBPACK_IMPORTED_MODULE_0__.onRuntimeMessage)('getOverlayCapture', (data, sender, response) => {
  let [currentTabId] = data;
  const captureData = overlayMap.get(currentTabId);
  response(captureData);
});

/***/ }),

/***/ "./src/utils/chrome.ts":
/*!*****************************!*\
  !*** ./src/utils/chrome.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExecEnv": () => (/* binding */ ExecEnv),
/* harmony export */   "currentEnv": () => (/* binding */ currentEnv),
/* harmony export */   "getAllTabs": () => (/* binding */ getAllTabs),
/* harmony export */   "getCurrentTab": () => (/* binding */ getCurrentTab),
/* harmony export */   "getSelected": () => (/* binding */ getSelected),
/* harmony export */   "getTab": () => (/* binding */ getTab),
/* harmony export */   "popupMaxHeight": () => (/* binding */ popupMaxHeight),
/* harmony export */   "popupMaxWidth": () => (/* binding */ popupMaxWidth),
/* harmony export */   "popupMinWidth": () => (/* binding */ popupMinWidth),
/* harmony export */   "setBodySize": () => (/* binding */ setBodySize)
/* harmony export */ });
// tabs =====================================================
async function getSelected() {
  return new Promise(res => {
    chrome.tabs.getSelected(function (tab) {
      res(tab);
    });
  });
}
async function getCurrentTab() {
  return chrome.tabs.getCurrent();
}
async function getTab(tabId) {
  return new Promise((res, rej) => {
    chrome.tabs.get(tabId, tab => {
      res(tab);
    });
  });
}
async function getAllTabs() {
  return new Promise(res => {
    chrome.tabs.query({}, tabs => {
      res(tabs);
    });
  });
} // message =====================================================
// export function sendToContent(message: string, callback: CommonCallback) {
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//         chrome.tabs.sendMessage(tabs[0]!.id!, message, function (response) {
//             if (callback) callback(response);
//         });
//     });
// }
// export function contentOnMessage(callback: CommonCallback) {
//     chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//         if (sender.tab) {
//             return;
//         }
//         callback && callback(request);
//     });
// }
// popup ========================================================

const popupMaxWidth = 500;
const popupMaxHeight = 600;
const popupMinWidth = 200;
function setBodySize(maxWidth, maxHeight) {
  $('#main').style.width = `${maxWidth ? popupMaxWidth : popupMinWidth}px`;

  if (typeof maxHeight === 'boolean') {
    $('#main').style.height = maxHeight ? `${popupMaxHeight}px` : '';
  }
} // env ========================================================

var ExecEnv;

(function (ExecEnv) {
  ExecEnv[ExecEnv["Background"] = 0] = "Background";
  ExecEnv[ExecEnv["Popup"] = 1] = "Popup";
  ExecEnv[ExecEnv["Content"] = 2] = "Content";
})(ExecEnv || (ExecEnv = {}));

function getCurrentEnv() {
  if (!chrome.extension.getBackgroundPage) {
    return ExecEnv.Content;
  }

  if (chrome.extension.getBackgroundPage() === window) {
    return ExecEnv.Background;
  }

  return ExecEnv.Popup;
}

const currentEnv = getCurrentEnv();

/***/ }),

/***/ "./src/utils/dragger.ts":
/*!******************************!*\
  !*** ./src/utils/dragger.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bindDragger": () => (/* binding */ bindDragger)
/* harmony export */ });
function bindDragger(node, startXGetter, startYGetter, onUpdate) {
  let dragging = false;
  let startX = 0;
  let startY = 0;
  let offsetX = 0;
  let offsetY = 0;
  node.draggable = false;
  node.addEventListener('mousedown', e => {
    if (!node) {
      return;
    }

    dragging = true;
    startX = startXGetter();
    startY = startYGetter();
    offsetX = e.pageX;
    offsetY = e.pageY;
  });
  window.addEventListener('mousemove', e => {
    if (!node) {
      return;
    }

    if (!dragging) {
      return;
    }

    onUpdate(e.pageX - offsetX + startX, e.pageY - offsetY + startY);
  });
  window.addEventListener('mouseup', e => {
    if (!node) {
      return;
    }

    if (!dragging) {
      return;
    }

    dragging = false;
  });
}

/***/ }),

/***/ "./src/utils/index.ts":
/*!****************************!*\
  !*** ./src/utils/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$": () => (/* reexport safe */ _tools__WEBPACK_IMPORTED_MODULE_4__.$),
/* harmony export */   "ExecEnv": () => (/* reexport safe */ _chrome__WEBPACK_IMPORTED_MODULE_3__.ExecEnv),
/* harmony export */   "arrayGroupBy": () => (/* reexport safe */ _tools__WEBPACK_IMPORTED_MODULE_4__.arrayGroupBy),
/* harmony export */   "bindDragger": () => (/* reexport safe */ _dragger__WEBPACK_IMPORTED_MODULE_1__.bindDragger),
/* harmony export */   "currentEnv": () => (/* reexport safe */ _chrome__WEBPACK_IMPORTED_MODULE_3__.currentEnv),
/* harmony export */   "debounce": () => (/* reexport safe */ _tools__WEBPACK_IMPORTED_MODULE_4__.debounce),
/* harmony export */   "download": () => (/* reexport safe */ _tools__WEBPACK_IMPORTED_MODULE_4__.download),
/* harmony export */   "evalScript": () => (/* reexport safe */ _tools__WEBPACK_IMPORTED_MODULE_4__.evalScript),
/* harmony export */   "getAllTabs": () => (/* reexport safe */ _chrome__WEBPACK_IMPORTED_MODULE_3__.getAllTabs),
/* harmony export */   "getCurrentTab": () => (/* reexport safe */ _chrome__WEBPACK_IMPORTED_MODULE_3__.getCurrentTab),
/* harmony export */   "getLocalStorage": () => (/* reexport safe */ _storage__WEBPACK_IMPORTED_MODULE_2__.getLocalStorage),
/* harmony export */   "getSelected": () => (/* reexport safe */ _chrome__WEBPACK_IMPORTED_MODULE_3__.getSelected),
/* harmony export */   "getStorageExportData": () => (/* reexport safe */ _storage__WEBPACK_IMPORTED_MODULE_2__.getStorageExportData),
/* harmony export */   "getTab": () => (/* reexport safe */ _chrome__WEBPACK_IMPORTED_MODULE_3__.getTab),
/* harmony export */   "insertTemplate": () => (/* reexport safe */ _tools__WEBPACK_IMPORTED_MODULE_4__.insertTemplate),
/* harmony export */   "loadImage": () => (/* reexport safe */ _tools__WEBPACK_IMPORTED_MODULE_4__.loadImage),
/* harmony export */   "onRuntimeMessage": () => (/* reexport safe */ _message__WEBPACK_IMPORTED_MODULE_0__.onRuntimeMessage),
/* harmony export */   "popupMaxHeight": () => (/* reexport safe */ _chrome__WEBPACK_IMPORTED_MODULE_3__.popupMaxHeight),
/* harmony export */   "popupMaxWidth": () => (/* reexport safe */ _chrome__WEBPACK_IMPORTED_MODULE_3__.popupMaxWidth),
/* harmony export */   "popupMinWidth": () => (/* reexport safe */ _chrome__WEBPACK_IMPORTED_MODULE_3__.popupMinWidth),
/* harmony export */   "readFile": () => (/* reexport safe */ _tools__WEBPACK_IMPORTED_MODULE_4__.readFile),
/* harmony export */   "registerStorage": () => (/* reexport safe */ _storage__WEBPACK_IMPORTED_MODULE_2__.registerStorage),
/* harmony export */   "sendRuntimeMessage": () => (/* reexport safe */ _message__WEBPACK_IMPORTED_MODULE_0__.sendRuntimeMessage),
/* harmony export */   "sendTabMessage": () => (/* reexport safe */ _message__WEBPACK_IMPORTED_MODULE_0__.sendTabMessage),
/* harmony export */   "setBodySize": () => (/* reexport safe */ _chrome__WEBPACK_IMPORTED_MODULE_3__.setBodySize),
/* harmony export */   "setLocalStorage": () => (/* reexport safe */ _storage__WEBPACK_IMPORTED_MODULE_2__.setLocalStorage),
/* harmony export */   "setStorageImportData": () => (/* reexport safe */ _storage__WEBPACK_IMPORTED_MODULE_2__.setStorageImportData),
/* harmony export */   "sleep": () => (/* reexport safe */ _tools__WEBPACK_IMPORTED_MODULE_4__.sleep)
/* harmony export */ });
/* harmony import */ var _message__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./message */ "./src/utils/message.ts");
/* harmony import */ var _dragger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dragger */ "./src/utils/dragger.ts");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storage */ "./src/utils/storage.ts");
/* harmony import */ var _chrome__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./chrome */ "./src/utils/chrome.ts");
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tools */ "./src/utils/tools.ts");




 // editor 单独引

/***/ }),

/***/ "./src/utils/message.ts":
/*!******************************!*\
  !*** ./src/utils/message.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "onRuntimeMessage": () => (/* binding */ onRuntimeMessage),
/* harmony export */   "sendRuntimeMessage": () => (/* binding */ sendRuntimeMessage),
/* harmony export */   "sendTabMessage": () => (/* binding */ sendTabMessage)
/* harmony export */ });
function onRuntimeMessage(channel, callback) {
  chrome.runtime.onMessage.addListener(function (request, sender, response) {
    if (request.channel !== channel) {
      return true;
    }

    setTimeout(() => {
      callback(request.data, sender, response);
    }, 1);
    return true;
  });
}
async function sendRuntimeMessage(channel, data, onResponse) {
  return new Promise(res => {
    if (onResponse) {
      chrome.runtime.sendMessage({
        channel,
        data
      }, data => {
        onResponse(data);
        res(data);
      });
    } else {
      chrome.runtime.sendMessage({
        channel,
        data
      });
    }
  });
}
function sendTabMessage(channel, tabId, data) {
  return chrome.tabs.sendMessage(tabId, {
    channel,
    data
  });
}

/***/ }),

/***/ "./src/utils/storage.ts":
/*!******************************!*\
  !*** ./src/utils/storage.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getLocalStorage": () => (/* binding */ getLocalStorage),
/* harmony export */   "getStorageExportData": () => (/* binding */ getStorageExportData),
/* harmony export */   "registerStorage": () => (/* binding */ registerStorage),
/* harmony export */   "setLocalStorage": () => (/* binding */ setLocalStorage),
/* harmony export */   "setStorageImportData": () => (/* binding */ setStorageImportData)
/* harmony export */ });
/* harmony import */ var _chrome__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chrome */ "./src/utils/chrome.ts");
 // storage =============

function getLocalStorage(name, defaultValue) {
  return new Promise(res => {
    chrome.storage.local.get(name, rs => res((rs === null || rs === void 0 ? void 0 : rs[name]) ?? defaultValue));
  });
}
async function setLocalStorage(name, value) {
  await chrome.storage.local.set({
    [name]: value
  });
}
const storageHandlerStore = new Map();
function registerStorage(key, handler) {
  storageHandlerStore.set(key, handler);

  if (_chrome__WEBPACK_IMPORTED_MODULE_0__.currentEnv !== _chrome__WEBPACK_IMPORTED_MODULE_0__.ExecEnv.Content) {
    console.log(`[storage] register module: ${key}`);
  }
}
async function getStorageExportData() {
  const data = {};

  for (let [key, handler] of storageHandlerStore) {
    if (handler) {
      data[key] = await handler.onExport();
    }
  }

  return JSON.stringify(data, null, 4);
}
async function setStorageImportData(data) {
  const dataObject = JSON.parse(data);

  for (let [key, handler] of storageHandlerStore) {
    const importData = dataObject[key];

    if (importData) {
      await (handler === null || handler === void 0 ? void 0 : handler.onImport(importData));
    }
  }
}

/***/ }),

/***/ "./src/utils/tools.ts":
/*!****************************!*\
  !*** ./src/utils/tools.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$": () => (/* binding */ $),
/* harmony export */   "arrayGroupBy": () => (/* binding */ arrayGroupBy),
/* harmony export */   "debounce": () => (/* binding */ debounce),
/* harmony export */   "download": () => (/* binding */ download),
/* harmony export */   "evalScript": () => (/* binding */ evalScript),
/* harmony export */   "insertTemplate": () => (/* binding */ insertTemplate),
/* harmony export */   "loadImage": () => (/* binding */ loadImage),
/* harmony export */   "readFile": () => (/* binding */ readFile),
/* harmony export */   "sleep": () => (/* binding */ sleep)
/* harmony export */ });
function evalScript(script) {
  let varObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const varNames = [];
  const varData = [];
  Object.entries(varObj).forEach(_ref => {
    let [name, data] = _ref;
    varNames.push(name);
    varData.push(data);
  });
  return new Function(...varNames, `"use strict";${script}`)(...varData);
}
function $(selector) {
  return document.querySelector(selector);
}
function debounce(fn) {
  let delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
  let timer = undefined;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    clearTimeout(timer);
    timer = window.setTimeout(() => fn(...args), delay);
  };
}
function sleep() {
  let n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return new Promise(res => {
    setTimeout(res, n);
  });
}
async function loadImage(src) {
  return new Promise((res, rej) => {
    const img = new Image();

    img.onload = () => {
      res(img);
    };

    img.onerror = rej;
    img.src = src;
  });
}
function arrayGroupBy(array, condition) {
  const map = new Map();
  array.forEach(item => {
    const value = condition(item);

    if (!map.has(value)) {
      map.set(value, []);
    }

    map.get(value).push(item);
  });
  return [...map.values()];
}
function insertTemplate(template) {
  return $('#main').insertAdjacentHTML('beforeend', template);
} // export async function loadScript(src: string) {
//     return new Promise((res, rej) => {
//         const s = document.createElement('script');
//         s.src = src;
//         s.onload = res;
//         s.onerror = rej;
//         document.body.appendChild(s);
//     });
// }

function download(fileName, url) {
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
}
async function readFile(file) {
  return new Promise((res, rej) => {
    const fileReader = new FileReader();
    fileReader.readAsText(file);

    fileReader.onload = function () {
      const fileContent = fileReader.result;
      res(fileContent);
    };

    fileReader.onerror = rej;
  });
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./node_modules/regenerator-runtime/runtime.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/background/background.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzdC9iYWNrZ3JvdW5kLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ3B0QkE7QUFDQTs7Ozs7Ozs7Ozs7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDMUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUN6RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDdkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBOzs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBRU5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ucC1jaHJvbWUtZXh0ZW5zaW9uLy4vbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyIsIndlYnBhY2s6Ly9ucC1jaHJvbWUtZXh0ZW5zaW9uLy4vc3JjL2JhY2tncm91bmQvYmFja2dyb3VuZC50cyIsIndlYnBhY2s6Ly9ucC1jaHJvbWUtZXh0ZW5zaW9uLy4vc3JjL2JhY2tncm91bmQvY29tbW9uLnRzIiwid2VicGFjazovL25wLWNocm9tZS1leHRlbnNpb24vLi9zcmMvbW9kdWxlcy9uZXR3b3JrL2FwaVJ1bGUudHMiLCJ3ZWJwYWNrOi8vbnAtY2hyb21lLWV4dGVuc2lvbi8uL3NyYy9tb2R1bGVzL25ldHdvcmsvYmFja2dyb3VuZC50cyIsIndlYnBhY2s6Ly9ucC1jaHJvbWUtZXh0ZW5zaW9uLy4vc3JjL21vZHVsZXMvb3ZlcmxheS9iYWNrZ3JvdW5kLnRzIiwid2VicGFjazovL25wLWNocm9tZS1leHRlbnNpb24vLi9zcmMvdXRpbHMvY2hyb21lLnRzIiwid2VicGFjazovL25wLWNocm9tZS1leHRlbnNpb24vLi9zcmMvdXRpbHMvZHJhZ2dlci50cyIsIndlYnBhY2s6Ly9ucC1jaHJvbWUtZXh0ZW5zaW9uLy4vc3JjL3V0aWxzL2luZGV4LnRzIiwid2VicGFjazovL25wLWNocm9tZS1leHRlbnNpb24vLi9zcmMvdXRpbHMvbWVzc2FnZS50cyIsIndlYnBhY2s6Ly9ucC1jaHJvbWUtZXh0ZW5zaW9uLy4vc3JjL3V0aWxzL3N0b3JhZ2UudHMiLCJ3ZWJwYWNrOi8vbnAtY2hyb21lLWV4dGVuc2lvbi8uL3NyYy91dGlscy90b29scy50cyIsIndlYnBhY2s6Ly9ucC1jaHJvbWUtZXh0ZW5zaW9uL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25wLWNocm9tZS1leHRlbnNpb24vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25wLWNocm9tZS1leHRlbnNpb24vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9ucC1jaHJvbWUtZXh0ZW5zaW9uL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbnAtY2hyb21lLWV4dGVuc2lvbi93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL25wLWNocm9tZS1leHRlbnNpb24vd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL25wLWNocm9tZS1leHRlbnNpb24vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG52YXIgcnVudGltZSA9IGZ1bmN0aW9uIChleHBvcnRzKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBPcCA9IE9iamVjdC5wcm90b3R5cGU7XG4gIHZhciBoYXNPd24gPSBPcC5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIHVuZGVmaW5lZDsgLy8gTW9yZSBjb21wcmVzc2libGUgdGhhbiB2b2lkIDAuXG5cbiAgdmFyICRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2wgOiB7fTtcbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcbiAgdmFyIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIjtcbiAgdmFyIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcblxuICBmdW5jdGlvbiBkZWZpbmUob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gb2JqW2tleV07XG4gIH1cblxuICB0cnkge1xuICAgIC8vIElFIDggaGFzIGEgYnJva2VuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSB0aGF0IG9ubHkgd29ya3Mgb24gRE9NIG9iamVjdHMuXG4gICAgZGVmaW5lKHt9LCBcIlwiKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgZGVmaW5lID0gZnVuY3Rpb24gKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIG9ialtrZXldID0gdmFsdWU7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBJZiBvdXRlckZuIHByb3ZpZGVkIGFuZCBvdXRlckZuLnByb3RvdHlwZSBpcyBhIEdlbmVyYXRvciwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci5cbiAgICB2YXIgcHJvdG9HZW5lcmF0b3IgPSBvdXRlckZuICYmIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gb3V0ZXJGbiA6IEdlbmVyYXRvcjtcbiAgICB2YXIgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShwcm90b0dlbmVyYXRvci5wcm90b3R5cGUpO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pOyAvLyBUaGUgLl9pbnZva2UgbWV0aG9kIHVuaWZpZXMgdGhlIGltcGxlbWVudGF0aW9ucyBvZiB0aGUgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzLlxuXG4gICAgZ2VuZXJhdG9yLl9pbnZva2UgPSBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH1cblxuICBleHBvcnRzLndyYXAgPSB3cmFwOyAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkXG4gIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWRcbiAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGVcbiAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG5cbiAgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IFwibm9ybWFsXCIsXG4gICAgICAgIGFyZzogZm4uY2FsbChvYmosIGFyZylcbiAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBcInRocm93XCIsXG4gICAgICAgIGFyZzogZXJyXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0ID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCA9IFwic3VzcGVuZGVkWWllbGRcIjtcbiAgdmFyIEdlblN0YXRlRXhlY3V0aW5nID0gXCJleGVjdXRpbmdcIjtcbiAgdmFyIEdlblN0YXRlQ29tcGxldGVkID0gXCJjb21wbGV0ZWRcIjsgLy8gUmV0dXJuaW5nIHRoaXMgb2JqZWN0IGZyb20gdGhlIGlubmVyRm4gaGFzIHRoZSBzYW1lIGVmZmVjdCBhc1xuICAvLyBicmVha2luZyBvdXQgb2YgdGhlIGRpc3BhdGNoIHN3aXRjaCBzdGF0ZW1lbnQuXG5cbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTsgLy8gRHVtbXkgY29uc3RydWN0b3IgZnVuY3Rpb25zIHRoYXQgd2UgdXNlIGFzIHRoZSAuY29uc3RydWN0b3IgYW5kXG4gIC8vIC5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgcHJvcGVydGllcyBmb3IgZnVuY3Rpb25zIHRoYXQgcmV0dXJuIEdlbmVyYXRvclxuICAvLyBvYmplY3RzLiBGb3IgZnVsbCBzcGVjIGNvbXBsaWFuY2UsIHlvdSBtYXkgd2lzaCB0byBjb25maWd1cmUgeW91clxuICAvLyBtaW5pZmllciBub3QgdG8gbWFuZ2xlIHRoZSBuYW1lcyBvZiB0aGVzZSB0d28gZnVuY3Rpb25zLlxuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge30gLy8gVGhpcyBpcyBhIHBvbHlmaWxsIGZvciAlSXRlcmF0b3JQcm90b3R5cGUlIGZvciBlbnZpcm9ubWVudHMgdGhhdFxuICAvLyBkb24ndCBuYXRpdmVseSBzdXBwb3J0IGl0LlxuXG5cbiAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG4gIGRlZmluZShJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSk7XG4gIHZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbiAgdmFyIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG8gJiYgZ2V0UHJvdG8oZ2V0UHJvdG8odmFsdWVzKFtdKSkpO1xuXG4gIGlmIChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAmJiBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAhPT0gT3AgJiYgaGFzT3duLmNhbGwoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sKSkge1xuICAgIC8vIFRoaXMgZW52aXJvbm1lbnQgaGFzIGEgbmF0aXZlICVJdGVyYXRvclByb3RvdHlwZSU7IHVzZSBpdCBpbnN0ZWFkXG4gICAgLy8gb2YgdGhlIHBvbHlmaWxsLlxuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gTmF0aXZlSXRlcmF0b3JQcm90b3R5cGU7XG4gIH1cblxuICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPSBHZW5lcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSk7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICBkZWZpbmUoR3AsIFwiY29uc3RydWN0b3JcIiwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICBkZWZpbmUoR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsIFwiY29uc3RydWN0b3JcIiwgR2VuZXJhdG9yRnVuY3Rpb24pO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IGRlZmluZShHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yRnVuY3Rpb25cIik7IC8vIEhlbHBlciBmb3IgZGVmaW5pbmcgdGhlIC5uZXh0LCAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMgb2YgdGhlXG4gIC8vIEl0ZXJhdG9yIGludGVyZmFjZSBpbiB0ZXJtcyBvZiBhIHNpbmdsZSAuX2ludm9rZSBtZXRob2QuXG5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcbiAgICAgIGRlZmluZShwcm90b3R5cGUsIG1ldGhvZCwgZnVuY3Rpb24gKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24gKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gdHlwZW9mIGdlbkZ1biA9PT0gXCJmdW5jdGlvblwiICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gY3RvciA/IGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8IC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAvLyBkbyBpcyB0byBjaGVjayBpdHMgLm5hbWUgcHJvcGVydHkuXG4gICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiIDogZmFsc2U7XG4gIH07XG5cbiAgZXhwb3J0cy5tYXJrID0gZnVuY3Rpb24gKGdlbkZ1bikge1xuICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgICAgZGVmaW5lKGdlbkZ1biwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yRnVuY3Rpb25cIik7XG4gICAgfVxuXG4gICAgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApO1xuICAgIHJldHVybiBnZW5GdW47XG4gIH07IC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAvLyBgeWllbGQgcmVnZW5lcmF0b3JSdW50aW1lLmF3cmFwKHgpYCwgc28gdGhhdCB0aGUgcnVudGltZSBjYW4gdGVzdFxuICAvLyBgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKWAgdG8gZGV0ZXJtaW5lIGlmIHRoZSB5aWVsZGVkIHZhbHVlIGlzXG4gIC8vIG1lYW50IHRvIGJlIGF3YWl0ZWQuXG5cblxuICBleHBvcnRzLmF3cmFwID0gZnVuY3Rpb24gKGFyZykge1xuICAgIHJldHVybiB7XG4gICAgICBfX2F3YWl0OiBhcmdcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yLCBQcm9taXNlSW1wbCkge1xuICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZ2VuZXJhdG9yW21ldGhvZF0sIGdlbmVyYXRvciwgYXJnKTtcblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmc7XG4gICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcblxuICAgICAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIikpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZS5fX2F3YWl0KS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJ0aHJvd1wiLCBlcnIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbiAodW53cmFwcGVkKSB7XG4gICAgICAgICAgLy8gV2hlbiBhIHlpZWxkZWQgUHJvbWlzZSBpcyByZXNvbHZlZCwgaXRzIGZpbmFsIHZhbHVlIGJlY29tZXNcbiAgICAgICAgICAvLyB0aGUgLnZhbHVlIG9mIHRoZSBQcm9taXNlPHt2YWx1ZSxkb25lfT4gcmVzdWx0IGZvciB0aGVcbiAgICAgICAgICAvLyBjdXJyZW50IGl0ZXJhdGlvbi5cbiAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQ7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAvLyBJZiBhIHJlamVjdGVkIFByb21pc2Ugd2FzIHlpZWxkZWQsIHRocm93IHRoZSByZWplY3Rpb24gYmFja1xuICAgICAgICAgIC8vIGludG8gdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBzbyBpdCBjYW4gYmUgaGFuZGxlZCB0aGVyZS5cbiAgICAgICAgICByZXR1cm4gaW52b2tlKFwidGhyb3dcIiwgZXJyb3IsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlSW1wbChmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9IC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgIC8vIGFsbCBwcmV2aW91cyBQcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQgYmVmb3JlIGNhbGxpbmcgaW52b2tlLFxuICAgICAgLy8gc28gdGhhdCByZXN1bHRzIGFyZSBhbHdheXMgZGVsaXZlcmVkIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBJZlxuICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgIC8vIGNhbGwgaW52b2tlIGltbWVkaWF0ZWx5LCB3aXRob3V0IHdhaXRpbmcgb24gYSBjYWxsYmFjayB0byBmaXJlLFxuICAgICAgLy8gc28gdGhhdCB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhcyB0aGUgb3Bwb3J0dW5pdHkgdG8gZG9cbiAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgIC8vIGlzIHdoeSB0aGUgUHJvbWlzZSBjb25zdHJ1Y3RvciBzeW5jaHJvbm91c2x5IGludm9rZXMgaXRzXG4gICAgICAvLyBleGVjdXRvciBjYWxsYmFjaywgYW5kIHdoeSBhc3luYyBmdW5jdGlvbnMgc3luY2hyb25vdXNseVxuICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBhc3luYyBnZW5lcmF0b3JzLCBpdCBpcyBlc3BlY2lhbGx5XG4gICAgICAvLyBpbXBvcnRhbnQgdG8gZ2V0IHRoaXMgcmlnaHQsIGV2ZW4gdGhvdWdoIGl0IHJlcXVpcmVzIGNhcmUuXG4gICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZywgLy8gQXZvaWQgcHJvcGFnYXRpbmcgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnkgbGF0ZXJcbiAgICAgIC8vIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKSA6IGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCk7XG4gICAgfSAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuXG5cbiAgICB0aGlzLl9pbnZva2UgPSBlbnF1ZXVlO1xuICB9XG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKTtcbiAgZGVmaW5lKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlLCBhc3luY0l0ZXJhdG9yU3ltYm9sLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pO1xuICBleHBvcnRzLkFzeW5jSXRlcmF0b3IgPSBBc3luY0l0ZXJhdG9yOyAvLyBOb3RlIHRoYXQgc2ltcGxlIGFzeW5jIGZ1bmN0aW9ucyBhcmUgaW1wbGVtZW50ZWQgb24gdG9wIG9mXG4gIC8vIEFzeW5jSXRlcmF0b3Igb2JqZWN0czsgdGhleSBqdXN0IHJldHVybiBhIFByb21pc2UgZm9yIHRoZSB2YWx1ZSBvZlxuICAvLyB0aGUgZmluYWwgcmVzdWx0IHByb2R1Y2VkIGJ5IHRoZSBpdGVyYXRvci5cblxuICBleHBvcnRzLmFzeW5jID0gZnVuY3Rpb24gKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0LCBQcm9taXNlSW1wbCkge1xuICAgIGlmIChQcm9taXNlSW1wbCA9PT0gdm9pZCAwKSBQcm9taXNlSW1wbCA9IFByb21pc2U7XG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcih3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSwgUHJvbWlzZUltcGwpO1xuICAgIHJldHVybiBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24ob3V0ZXJGbikgPyBpdGVyIC8vIElmIG91dGVyRm4gaXMgYSBnZW5lcmF0b3IsIHJldHVybiB0aGUgZnVsbCBpdGVyYXRvci5cbiAgICA6IGl0ZXIubmV4dCgpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gcmVzdWx0LnZhbHVlIDogaXRlci5uZXh0KCk7XG4gICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcbiAgICByZXR1cm4gZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlRXhlY3V0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVDb21wbGV0ZWQpIHtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICB9IC8vIEJlIGZvcmdpdmluZywgcGVyIDI1LjMuMy4zLjMgb2YgdGhlIHNwZWM6XG4gICAgICAgIC8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1nZW5lcmF0b3JyZXN1bWVcblxuXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQubWV0aG9kID0gbWV0aG9kO1xuICAgICAgY29udGV4dC5hcmcgPSBhcmc7XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG5cbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgdmFyIGRlbGVnYXRlUmVzdWx0ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG5cbiAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCA9PT0gQ29udGludWVTZW50aW5lbCkgY29udGludWU7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGVSZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAgIC8vIFNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICAgICAgY29udGV4dC5zZW50ID0gY29udGV4dC5fc2VudCA9IGNvbnRleHQuYXJnO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICB0aHJvdyBjb250ZXh0LmFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG4gICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcblxuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lID8gR2VuU3RhdGVDb21wbGV0ZWQgOiBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogcmVjb3JkLmFyZyxcbiAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7IC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKSBjYWxsIGFib3ZlLlxuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfSAvLyBDYWxsIGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXShjb250ZXh0LmFyZykgYW5kIGhhbmRsZSB0aGVcbiAgLy8gcmVzdWx0LCBlaXRoZXIgYnkgcmV0dXJuaW5nIGEgeyB2YWx1ZSwgZG9uZSB9IHJlc3VsdCBmcm9tIHRoZVxuICAvLyBkZWxlZ2F0ZSBpdGVyYXRvciwgb3IgYnkgbW9kaWZ5aW5nIGNvbnRleHQubWV0aG9kIGFuZCBjb250ZXh0LmFyZyxcbiAgLy8gc2V0dGluZyBjb250ZXh0LmRlbGVnYXRlIHRvIG51bGwsIGFuZCByZXR1cm5pbmcgdGhlIENvbnRpbnVlU2VudGluZWwuXG5cblxuICBmdW5jdGlvbiBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIG1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXTtcblxuICAgIGlmIChtZXRob2QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gQSAudGhyb3cgb3IgLnJldHVybiB3aGVuIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgbm8gLnRocm93XG4gICAgICAvLyBtZXRob2QgYWx3YXlzIHRlcm1pbmF0ZXMgdGhlIHlpZWxkKiBsb29wLlxuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIC8vIE5vdGU6IFtcInJldHVyblwiXSBtdXN0IGJlIHVzZWQgZm9yIEVTMyBwYXJzaW5nIGNvbXBhdGliaWxpdHkuXG4gICAgICAgIGlmIChkZWxlZ2F0ZS5pdGVyYXRvcltcInJldHVyblwiXSkge1xuICAgICAgICAgIC8vIElmIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgYSByZXR1cm4gbWV0aG9kLCBnaXZlIGl0IGFcbiAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIC8vIElmIG1heWJlSW52b2tlRGVsZWdhdGUoY29udGV4dCkgY2hhbmdlZCBjb250ZXh0Lm1ldGhvZCBmcm9tXG4gICAgICAgICAgICAvLyBcInJldHVyblwiIHRvIFwidGhyb3dcIiwgbGV0IHRoYXQgb3ZlcnJpZGUgdGhlIFR5cGVFcnJvciBiZWxvdy5cbiAgICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICd0aHJvdycgbWV0aG9kXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuXG4gICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG5cbiAgICBpZiAoIWluZm8pIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiaXRlcmF0b3IgcmVzdWx0IGlzIG5vdCBhbiBvYmplY3RcIik7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgIC8vIEFzc2lnbiB0aGUgcmVzdWx0IG9mIHRoZSBmaW5pc2hlZCBkZWxlZ2F0ZSB0byB0aGUgdGVtcG9yYXJ5XG4gICAgICAvLyB2YXJpYWJsZSBzcGVjaWZpZWQgYnkgZGVsZWdhdGUucmVzdWx0TmFtZSAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWU7IC8vIFJlc3VtZSBleGVjdXRpb24gYXQgdGhlIGRlc2lyZWQgbG9jYXRpb24gKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cblxuICAgICAgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYzsgLy8gSWYgY29udGV4dC5tZXRob2Qgd2FzIFwidGhyb3dcIiBidXQgdGhlIGRlbGVnYXRlIGhhbmRsZWQgdGhlXG4gICAgICAvLyBleGNlcHRpb24sIGxldCB0aGUgb3V0ZXIgZ2VuZXJhdG9yIHByb2NlZWQgbm9ybWFsbHkuIElmXG4gICAgICAvLyBjb250ZXh0Lm1ldGhvZCB3YXMgXCJuZXh0XCIsIGZvcmdldCBjb250ZXh0LmFyZyBzaW5jZSBpdCBoYXMgYmVlblxuICAgICAgLy8gXCJjb25zdW1lZFwiIGJ5IHRoZSBkZWxlZ2F0ZSBpdGVyYXRvci4gSWYgY29udGV4dC5tZXRob2Qgd2FzXG4gICAgICAvLyBcInJldHVyblwiLCBhbGxvdyB0aGUgb3JpZ2luYWwgLnJldHVybiBjYWxsIHRvIGNvbnRpbnVlIGluIHRoZVxuICAgICAgLy8gb3V0ZXIgZ2VuZXJhdG9yLlxuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlLXlpZWxkIHRoZSByZXN1bHQgcmV0dXJuZWQgYnkgdGhlIGRlbGVnYXRlIG1ldGhvZC5cbiAgICAgIHJldHVybiBpbmZvO1xuICAgIH0gLy8gVGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGlzIGZpbmlzaGVkLCBzbyBmb3JnZXQgaXQgYW5kIGNvbnRpbnVlIHdpdGhcbiAgICAvLyB0aGUgb3V0ZXIgZ2VuZXJhdG9yLlxuXG5cbiAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgfSAvLyBEZWZpbmUgR2VuZXJhdG9yLnByb3RvdHlwZS57bmV4dCx0aHJvdyxyZXR1cm59IGluIHRlcm1zIG9mIHRoZVxuICAvLyB1bmlmaWVkIC5faW52b2tlIGhlbHBlciBtZXRob2QuXG5cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuICBkZWZpbmUoR3AsIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvclwiKTsgLy8gQSBHZW5lcmF0b3Igc2hvdWxkIGFsd2F5cyByZXR1cm4gaXRzZWxmIGFzIHRoZSBpdGVyYXRvciBvYmplY3Qgd2hlbiB0aGVcbiAgLy8gQEBpdGVyYXRvciBmdW5jdGlvbiBpcyBjYWxsZWQgb24gaXQuIFNvbWUgYnJvd3NlcnMnIGltcGxlbWVudGF0aW9ucyBvZiB0aGVcbiAgLy8gaXRlcmF0b3IgcHJvdG90eXBlIGNoYWluIGluY29ycmVjdGx5IGltcGxlbWVudCB0aGlzLCBjYXVzaW5nIHRoZSBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0IHRvIG5vdCBiZSByZXR1cm5lZCBmcm9tIHRoaXMgY2FsbC4gVGhpcyBlbnN1cmVzIHRoYXQgZG9lc24ndCBoYXBwZW4uXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvaXNzdWVzLzI3NCBmb3IgbW9yZSBkZXRhaWxzLlxuXG4gIGRlZmluZShHcCwgaXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSk7XG4gIGRlZmluZShHcCwgXCJ0b1N0cmluZ1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBHZW5lcmF0b3JdXCI7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHB1c2hUcnlFbnRyeShsb2NzKSB7XG4gICAgdmFyIGVudHJ5ID0ge1xuICAgICAgdHJ5TG9jOiBsb2NzWzBdXG4gICAgfTtcblxuICAgIGlmICgxIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXTtcbiAgICB9XG5cbiAgICBpZiAoMiBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5maW5hbGx5TG9jID0gbG9jc1syXTtcbiAgICAgIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXTtcbiAgICB9XG5cbiAgICB0aGlzLnRyeUVudHJpZXMucHVzaChlbnRyeSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307XG4gICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiO1xuICAgIGRlbGV0ZSByZWNvcmQuYXJnO1xuICAgIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cblxuICBmdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gVGhlIHJvb3QgZW50cnkgb2JqZWN0IChlZmZlY3RpdmVseSBhIHRyeSBzdGF0ZW1lbnQgd2l0aG91dCBhIGNhdGNoXG4gICAgLy8gb3IgYSBmaW5hbGx5IGJsb2NrKSBnaXZlcyB1cyBhIHBsYWNlIHRvIHN0b3JlIHZhbHVlcyB0aHJvd24gZnJvbVxuICAgIC8vIGxvY2F0aW9ucyB3aGVyZSB0aGVyZSBpcyBubyBlbmNsb3NpbmcgdHJ5IHN0YXRlbWVudC5cbiAgICB0aGlzLnRyeUVudHJpZXMgPSBbe1xuICAgICAgdHJ5TG9jOiBcInJvb3RcIlxuICAgIH1dO1xuICAgIHRyeUxvY3NMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LCB0aGlzKTtcbiAgICB0aGlzLnJlc2V0KHRydWUpO1xuICB9XG5cbiAgZXhwb3J0cy5rZXlzID0gZnVuY3Rpb24gKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG5cbiAgICBrZXlzLnJldmVyc2UoKTsgLy8gUmF0aGVyIHRoYW4gcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIGEgbmV4dCBtZXRob2QsIHdlIGtlZXBcbiAgICAvLyB0aGluZ3Mgc2ltcGxlIGFuZCByZXR1cm4gdGhlIG5leHQgZnVuY3Rpb24gaXRzZWxmLlxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG5cbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICB9IC8vIFRvIGF2b2lkIGNyZWF0aW5nIGFuIGFkZGl0aW9uYWwgb2JqZWN0LCB3ZSBqdXN0IGhhbmcgdGhlIC52YWx1ZVxuICAgICAgLy8gYW5kIC5kb25lIHByb3BlcnRpZXMgb2ZmIHRoZSBuZXh0IGZ1bmN0aW9uIG9iamVjdCBpdHNlbGYuIFRoaXNcbiAgICAgIC8vIGFsc28gZW5zdXJlcyB0aGF0IHRoZSBtaW5pZmllciB3aWxsIG5vdCBhbm9ueW1pemUgdGhlIGZ1bmN0aW9uLlxuXG5cbiAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuXG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlLm5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLFxuICAgICAgICAgICAgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgd2hpbGUgKCsraSA8IGl0ZXJhYmxlLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkge1xuICAgICAgICAgICAgICBuZXh0LnZhbHVlID0gaXRlcmFibGVbaV07XG4gICAgICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXh0LnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfSAvLyBSZXR1cm4gYW4gaXRlcmF0b3Igd2l0aCBubyB2YWx1ZXMuXG5cblxuICAgIHJldHVybiB7XG4gICAgICBuZXh0OiBkb25lUmVzdWx0XG4gICAgfTtcbiAgfVxuXG4gIGV4cG9ydHMudmFsdWVzID0gdmFsdWVzO1xuXG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiB1bmRlZmluZWQsXG4gICAgICBkb25lOiB0cnVlXG4gICAgfTtcbiAgfVxuXG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuICAgIHJlc2V0OiBmdW5jdGlvbiAoc2tpcFRlbXBSZXNldCkge1xuICAgICAgdGhpcy5wcmV2ID0gMDtcbiAgICAgIHRoaXMubmV4dCA9IDA7IC8vIFJlc2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuXG4gICAgICB0aGlzLnNlbnQgPSB0aGlzLl9zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpO1xuXG4gICAgICBpZiAoIXNraXBUZW1wUmVzZXQpIHtcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgICAgLy8gTm90IHN1cmUgYWJvdXQgdGhlIG9wdGltYWwgb3JkZXIgb2YgdGhlc2UgY29uZGl0aW9uczpcbiAgICAgICAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT09IFwidFwiICYmIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmICFpc05hTigrbmFtZS5zbGljZSgxKSkpIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBzdG9wOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuICAgICAgdmFyIHJvb3RFbnRyeSA9IHRoaXMudHJ5RW50cmllc1swXTtcbiAgICAgIHZhciByb290UmVjb3JkID0gcm9vdEVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgIGlmIChyb290UmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByb290UmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbiAoZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuXG4gICAgICBmdW5jdGlvbiBoYW5kbGUobG9jLCBjYXVnaHQpIHtcbiAgICAgICAgcmVjb3JkLnR5cGUgPSBcInRocm93XCI7XG4gICAgICAgIHJlY29yZC5hcmcgPSBleGNlcHRpb247XG4gICAgICAgIGNvbnRleHQubmV4dCA9IGxvYztcblxuICAgICAgICBpZiAoY2F1Z2h0KSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRpc3BhdGNoZWQgZXhjZXB0aW9uIHdhcyBjYXVnaHQgYnkgYSBjYXRjaCBibG9jayxcbiAgICAgICAgICAvLyB0aGVuIGxldCB0aGF0IGNhdGNoIGJsb2NrIGhhbmRsZSB0aGUgZXhjZXB0aW9uIG5vcm1hbGx5LlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gISFjYXVnaHQ7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSBcInJvb3RcIikge1xuICAgICAgICAgIC8vIEV4Y2VwdGlvbiB0aHJvd24gb3V0c2lkZSBvZiBhbnkgdHJ5IGJsb2NrIHRoYXQgY291bGQgaGFuZGxlXG4gICAgICAgICAgLy8gaXQsIHNvIHNldCB0aGUgY29tcGxldGlvbiB2YWx1ZSBvZiB0aGUgZW50aXJlIGZ1bmN0aW9uIHRvXG4gICAgICAgICAgLy8gdGhyb3cgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICByZXR1cm4gaGFuZGxlKFwiZW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKTtcbiAgICAgICAgICB2YXIgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG5cbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNDYXRjaCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBhYnJ1cHQ6IGZ1bmN0aW9uICh0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2ICYmIGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIikgJiYgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmICh0eXBlID09PSBcImJyZWFrXCIgfHwgdHlwZSA9PT0gXCJjb250aW51ZVwiKSAmJiBmaW5hbGx5RW50cnkudHJ5TG9jIDw9IGFyZyAmJiBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmVjb3JkLnR5cGUgPSB0eXBlO1xuICAgICAgcmVjb3JkLmFyZyA9IGFyZztcblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSkge1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYztcbiAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcbiAgICBjb21wbGV0ZTogZnVuY3Rpb24gKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJicmVha1wiIHx8IHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gdGhpcy5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgIHRoaXMubmV4dCA9IFwiZW5kXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiICYmIGFmdGVyTG9jKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGFmdGVyTG9jO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuICAgIGZpbmlzaDogZnVuY3Rpb24gKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuXG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24gKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gdHJ5TG9jKSB7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9IC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvblxuICAgICAgLy8gYXJndW1lbnQgdGhhdCBjb3JyZXNwb25kcyB0byBhIGtub3duIGNhdGNoIGJsb2NrLlxuXG5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uIChpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgLy8gRGVsaWJlcmF0ZWx5IGZvcmdldCB0aGUgbGFzdCBzZW50IHZhbHVlIHNvIHRoYXQgd2UgZG9uJ3RcbiAgICAgICAgLy8gYWNjaWRlbnRhbGx5IHBhc3MgaXQgb24gdG8gdGhlIGRlbGVnYXRlLlxuICAgICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9OyAvLyBSZWdhcmRsZXNzIG9mIHdoZXRoZXIgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlXG4gIC8vIG9yIG5vdCwgcmV0dXJuIHRoZSBydW50aW1lIG9iamVjdCBzbyB0aGF0IHdlIGNhbiBkZWNsYXJlIHRoZSB2YXJpYWJsZVxuICAvLyByZWdlbmVyYXRvclJ1bnRpbWUgaW4gdGhlIG91dGVyIHNjb3BlLCB3aGljaCBhbGxvd3MgdGhpcyBtb2R1bGUgdG8gYmVcbiAgLy8gaW5qZWN0ZWQgZWFzaWx5IGJ5IGBiaW4vcmVnZW5lcmF0b3IgLS1pbmNsdWRlLXJ1bnRpbWUgc2NyaXB0LmpzYC5cblxuICByZXR1cm4gZXhwb3J0cztcbn0oIC8vIElmIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZSwgdXNlIG1vZHVsZS5leHBvcnRzXG4vLyBhcyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIG5hbWVzcGFjZS4gT3RoZXJ3aXNlIGNyZWF0ZSBhIG5ldyBlbXB0eVxuLy8gb2JqZWN0LiBFaXRoZXIgd2F5LCB0aGUgcmVzdWx0aW5nIG9iamVjdCB3aWxsIGJlIHVzZWQgdG8gaW5pdGlhbGl6ZVxuLy8gdGhlIHJlZ2VuZXJhdG9yUnVudGltZSB2YXJpYWJsZSBhdCB0aGUgdG9wIG9mIHRoaXMgZmlsZS5cbnR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgPyBtb2R1bGUuZXhwb3J0cyA6IHt9KTtcblxudHJ5IHtcbiAgcmVnZW5lcmF0b3JSdW50aW1lID0gcnVudGltZTtcbn0gY2F0Y2ggKGFjY2lkZW50YWxTdHJpY3RNb2RlKSB7XG4gIC8vIFRoaXMgbW9kdWxlIHNob3VsZCBub3QgYmUgcnVubmluZyBpbiBzdHJpY3QgbW9kZSwgc28gdGhlIGFib3ZlXG4gIC8vIGFzc2lnbm1lbnQgc2hvdWxkIGFsd2F5cyB3b3JrIHVubGVzcyBzb21ldGhpbmcgaXMgbWlzY29uZmlndXJlZC4gSnVzdFxuICAvLyBpbiBjYXNlIHJ1bnRpbWUuanMgYWNjaWRlbnRhbGx5IHJ1bnMgaW4gc3RyaWN0IG1vZGUsIGluIG1vZGVybiBlbmdpbmVzXG4gIC8vIHdlIGNhbiBleHBsaWNpdGx5IGFjY2VzcyBnbG9iYWxUaGlzLiBJbiBvbGRlciBlbmdpbmVzIHdlIGNhbiBlc2NhcGVcbiAgLy8gc3RyaWN0IG1vZGUgdXNpbmcgYSBnbG9iYWwgRnVuY3Rpb24gY2FsbC4gVGhpcyBjb3VsZCBjb25jZWl2YWJseSBmYWlsXG4gIC8vIGlmIGEgQ29udGVudCBTZWN1cml0eSBQb2xpY3kgZm9yYmlkcyB1c2luZyBGdW5jdGlvbiwgYnV0IGluIHRoYXQgY2FzZVxuICAvLyB0aGUgcHJvcGVyIHNvbHV0aW9uIGlzIHRvIGZpeCB0aGUgYWNjaWRlbnRhbCBzdHJpY3QgbW9kZSBwcm9ibGVtLiBJZlxuICAvLyB5b3UndmUgbWlzY29uZmlndXJlZCB5b3VyIGJ1bmRsZXIgdG8gZm9yY2Ugc3RyaWN0IG1vZGUgYW5kIGFwcGxpZWQgYVxuICAvLyBDU1AgdG8gZm9yYmlkIEZ1bmN0aW9uLCBhbmQgeW91J3JlIG5vdCB3aWxsaW5nIHRvIGZpeCBlaXRoZXIgb2YgdGhvc2VcbiAgLy8gcHJvYmxlbXMsIHBsZWFzZSBkZXRhaWwgeW91ciB1bmlxdWUgcHJlZGljYW1lbnQgaW4gYSBHaXRIdWIgaXNzdWUuXG4gIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gXCJvYmplY3RcIikge1xuICAgIGdsb2JhbFRoaXMucmVnZW5lcmF0b3JSdW50aW1lID0gcnVudGltZTtcbiAgfSBlbHNlIHtcbiAgICBGdW5jdGlvbihcInJcIiwgXCJyZWdlbmVyYXRvclJ1bnRpbWUgPSByXCIpKHJ1bnRpbWUpO1xuICB9XG59IiwiaW1wb3J0ICcuL2NvbW1vbic7XG5pbXBvcnQgJy4uL21vZHVsZXMvb3ZlcmxheS9iYWNrZ3JvdW5kJztcbmltcG9ydCAnLi4vbW9kdWxlcy9uZXR3b3JrL2JhY2tncm91bmQnOyIsImltcG9ydCB7IG9uUnVudGltZU1lc3NhZ2UgfSBmcm9tICcuLi91dGlscyc7IC8vIGNocm9tZS50YWJzLm9uVXBkYXRlZC5hZGRMaXN0ZW5lcigodGFiKSA9PiB7XG4vLyAgICAgY29uc29sZS5sb2coJ2NyZWF0ZSB0YWInLCB0YWIuaWQpXG4vLyAgICAgc2VuZFRhYk1lc3NhZ2UodGFiLmlkISwgW3RhYi5pZCFdKTtcbi8vIH0pO1xuXG5vblJ1bnRpbWVNZXNzYWdlKCd0YWJJbmZvJywgKGRhdGEsIHNlbmRlciwgcmVzcG9uc2UpID0+IHtcbiAgdmFyIF9zZW5kZXIkdGFiO1xuXG4gIHJlc3BvbnNlKChfc2VuZGVyJHRhYiA9IHNlbmRlci50YWIpID09PSBudWxsIHx8IF9zZW5kZXIkdGFiID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfc2VuZGVyJHRhYi5pZCk7XG59KTsiLCJpbXBvcnQgeyBnZXRMb2NhbFN0b3JhZ2UsIHJlZ2lzdGVyU3RvcmFnZSwgc2V0TG9jYWxTdG9yYWdlIH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xuZXhwb3J0IGNvbnN0IG5ldHdvcmtMaWZlQ3ljbGUgPSBbJ3Jlc3BvbnNlJ107XG5jb25zdCBzdG9yYWdlS2V5ID0gJ25ldHdvcmtSdWxlcyc7XG5cbmNsYXNzIE5ldHdvcmtSdWxlSGFuZGxlciB7XG4gIGVuYWJsZSA9IGZhbHNlO1xuXG4gIGFzeW5jIHJlZnJlc2goKSB7XG4gICAgY29uc3Qge1xuICAgICAgZW5hYmxlLFxuICAgICAgcnVsZXNcbiAgICB9ID0gYXdhaXQgZ2V0TG9jYWxTdG9yYWdlKHN0b3JhZ2VLZXksIHtcbiAgICAgIGVuYWJsZTogZmFsc2UsXG4gICAgICBydWxlczoge31cbiAgICB9KTtcbiAgICB0aGlzLmFsbFJ1bGVzID0gcnVsZXM7XG4gICAgdGhpcy5lbmFibGUgPSBlbmFibGU7XG4gIH1cblxuICBhc3luYyBhbGxOZXR3b3JrUnVsZXMoKSB7XG4gICAgaWYgKCF0aGlzLmFsbFJ1bGVzKSB7XG4gICAgICBhd2FpdCB0aGlzLnJlZnJlc2goKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5hbGxSdWxlcztcbiAgfVxuXG4gIHNldEVuYWJsZShib29sKSB7XG4gICAgdGhpcy5lbmFibGUgPSBib29sO1xuICAgIHRoaXMuc2F2ZSgpO1xuICB9XG5cbiAgYXN5bmMgZ2V0TmV0d29ya1J1bGUodXJsKSB7XG4gICAgdmFyIF90aGlzJGFsbFJ1bGVzO1xuXG4gICAgbGV0IGNoZWNrRW5hYmxlID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBmYWxzZTtcbiAgICBhd2FpdCB0aGlzLmFsbE5ldHdvcmtSdWxlcygpO1xuICAgIGNvbnN0IHJ1bGUgPSAoX3RoaXMkYWxsUnVsZXMgPSB0aGlzLmFsbFJ1bGVzKSA9PT0gbnVsbCB8fCBfdGhpcyRhbGxSdWxlcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3RoaXMkYWxsUnVsZXNbdXJsXTtcblxuICAgIGlmIChydWxlICYmIGNoZWNrRW5hYmxlKSB7XG4gICAgICBpZiAoT2JqZWN0LmtleXMocnVsZS5ydWxlcykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChPYmplY3QudmFsdWVzKHJ1bGUucnVsZXMpLmV2ZXJ5KHJlcXVlc3RSdWxlID0+IHtcbiAgICAgICAgY29uc3QgaXNFbXB0eSA9IG5ldHdvcmtMaWZlQ3ljbGUuZXZlcnkobGlmZSA9PiB7XG4gICAgICAgICAgdmFyIF9yZXF1ZXN0UnVsZSRsaWZlLCBfcmVxdWVzdFJ1bGUkbGlmZTI7XG5cbiAgICAgICAgICByZXR1cm4gISgoX3JlcXVlc3RSdWxlJGxpZmUgPSByZXF1ZXN0UnVsZVtsaWZlXSkgIT09IG51bGwgJiYgX3JlcXVlc3RSdWxlJGxpZmUgIT09IHZvaWQgMCAmJiBfcmVxdWVzdFJ1bGUkbGlmZS5lbmFibGUpIHx8ICEoKF9yZXF1ZXN0UnVsZSRsaWZlMiA9IHJlcXVlc3RSdWxlW2xpZmVdKSAhPT0gbnVsbCAmJiBfcmVxdWVzdFJ1bGUkbGlmZTIgIT09IHZvaWQgMCAmJiBfcmVxdWVzdFJ1bGUkbGlmZTIuaGFuZGxlckZ1bmN0aW9uU2NyaXB0LnRyaW0oKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gaXNFbXB0eTtcbiAgICAgIH0pKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJ1bGU7XG4gIH1cblxuICBhc3luYyBlbnN1cmVSdWxlKHVybCkge1xuICAgIGF3YWl0IHRoaXMuYWxsTmV0d29ya1J1bGVzKCk7XG4gICAgbGV0IHJ1bGUgPSBhd2FpdCB0aGlzLmdldE5ldHdvcmtSdWxlKHVybCk7XG5cbiAgICBpZiAoIXJ1bGUpIHtcbiAgICAgIHJ1bGUgPSB7XG4gICAgICAgIHVybCxcbiAgICAgICAgcnVsZXM6IHt9XG4gICAgICB9O1xuICAgICAgdGhpcy5hbGxSdWxlc1t1cmxdID0gcnVsZTtcbiAgICB9XG5cbiAgICByZXR1cm4gcnVsZTtcbiAgfVxuXG4gIGdldFJlcXVlc3RVcmxLZXkocmVxdWVzdFVybCwgYmFzZVVybCkge1xuICAgIGNvbnN0IHBhcnNlZFVybE9iamVjdCA9IG5ldyBVUkwocmVxdWVzdFVybCwgYmFzZVVybCk7XG4gICAgcmV0dXJuIGAke3BhcnNlZFVybE9iamVjdC5vcmlnaW59JHtwYXJzZWRVcmxPYmplY3QucGF0aG5hbWV9YDtcbiAgfVxuXG4gIGFzeW5jIGNvbmZpZ1J1bGVSZXF1ZXN0KHVybCwgcmVxdWVzdFVybCwgcmVxdWVzdFJ1bGUsIHN0YXRlKSB7XG4gICAgY29uc3QgcnVsZSA9IGF3YWl0IHRoaXMuZW5zdXJlUnVsZSh1cmwpO1xuICAgIGNvbnN0IHBhcnNlZFVybCA9IHRoaXMuZ2V0UmVxdWVzdFVybEtleShyZXF1ZXN0VXJsLCB1cmwpO1xuICAgIHJ1bGUucnVsZXNbcGFyc2VkVXJsXSA9IHJ1bGUucnVsZXNbcGFyc2VkVXJsXSA/PyB7XG4gICAgICB1cmw6IHJlcXVlc3RVcmxcbiAgICB9O1xuICAgIGNvbnN0IHJlcXVlc3RVcmxSdWxlID0gcnVsZS5ydWxlc1twYXJzZWRVcmxdO1xuICAgIHJlcXVlc3RVcmxSdWxlW3N0YXRlXSA9IHJlcXVlc3RVcmxSdWxlW3N0YXRlXSA/PyB7XG4gICAgICBlbmFibGU6IHRydWUsXG4gICAgICBoYW5kbGVyRnVuY3Rpb25TY3JpcHQ6ICcnXG4gICAgfTtcbiAgICBPYmplY3QuYXNzaWduKHJlcXVlc3RVcmxSdWxlW3N0YXRlXSwgcmVxdWVzdFJ1bGUpO1xuICAgIHRoaXMuc2F2ZSgpO1xuICB9XG5cbiAgYXN5bmMgc2F2ZSgpIHtcbiAgICBhd2FpdCBzZXRMb2NhbFN0b3JhZ2Uoc3RvcmFnZUtleSwge1xuICAgICAgZW5hYmxlOiB0aGlzLmVuYWJsZSxcbiAgICAgIHJ1bGVzOiB0aGlzLmFsbFJ1bGVzID8/IHt9XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBmb3JjZVNhdmUocnVsZXMpIHtcbiAgICBhd2FpdCBzZXRMb2NhbFN0b3JhZ2Uoc3RvcmFnZUtleSwge1xuICAgICAgZW5hYmxlOiB0aGlzLmVuYWJsZSxcbiAgICAgIHJ1bGVzOiBKU09OLnBhcnNlKHJ1bGVzKSA/PyB7fVxuICAgIH0pO1xuICB9XG5cbn1cblxuZXhwb3J0IGNvbnN0IG5ldHdvcmtSdWxlSGFuZGxlciA9IG5ldyBOZXR3b3JrUnVsZUhhbmRsZXIoKTtcbnJlZ2lzdGVyU3RvcmFnZShzdG9yYWdlS2V5LCB7XG4gIG9uRXhwb3J0OiBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IGdldExvY2FsU3RvcmFnZShzdG9yYWdlS2V5LCB7XG4gICAgICBlbmFibGU6IGZhbHNlLFxuICAgICAgcnVsZXM6IHt9XG4gICAgfSk7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH0sXG4gIG9uSW1wb3J0OiBhc3luYyBkYXRhID0+IHtcbiAgICBhd2FpdCBzZXRMb2NhbFN0b3JhZ2Uoc3RvcmFnZUtleSwgZGF0YSk7XG4gIH1cbn0pOyIsImltcG9ydCB7IGdldFRhYiwgZGVib3VuY2UsIGV2YWxTY3JpcHQgfSBmcm9tICcuLi8uLi91dGlscyc7XG5pbXBvcnQgeyBuZXR3b3JrUnVsZUhhbmRsZXIgfSBmcm9tICcuL2FwaVJ1bGUnO1xuY29uc3Qgd2F0Y2hpbmdNYXAgPSBuZXcgU2V0KCk7XG5cbmZ1bmN0aW9uIGdldFVybFJ1bGUocnVsZSwgcmVxdWVzdFVybCkge1xuICB2YXIgX3J1bGUkcnVsZXMkY2hlY2tLZXksIF9ydWxlJHJ1bGVzJGNoZWNrS2V5JCwgX3J1bGUkcnVsZXMkY2hlY2tLZXkyO1xuXG4gIGxldCBzdGF0ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogJ3Jlc3BvbnNlJztcbiAgY29uc3QgY2hlY2tLZXkgPSByZXF1ZXN0VXJsLnNwbGl0KCc/JylbMF07IC8vIGlmKGNoZWNrS2V5LmluY2x1ZGVzKCcvZGV0YWlsJykpe2RlYnVnZ2VyfVxuXG4gIGlmICghKHJ1bGUgIT09IG51bGwgJiYgcnVsZSAhPT0gdm9pZCAwICYmIChfcnVsZSRydWxlcyRjaGVja0tleSA9IHJ1bGUucnVsZXNbY2hlY2tLZXldKSAhPT0gbnVsbCAmJiBfcnVsZSRydWxlcyRjaGVja0tleSAhPT0gdm9pZCAwICYmIChfcnVsZSRydWxlcyRjaGVja0tleSQgPSBfcnVsZSRydWxlcyRjaGVja0tleVtzdGF0ZV0pICE9PSBudWxsICYmIF9ydWxlJHJ1bGVzJGNoZWNrS2V5JCAhPT0gdm9pZCAwICYmIF9ydWxlJHJ1bGVzJGNoZWNrS2V5JC5lbmFibGUpKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIHJldHVybiAoX3J1bGUkcnVsZXMkY2hlY2tLZXkyID0gcnVsZS5ydWxlc1tjaGVja0tleV0pID09PSBudWxsIHx8IF9ydWxlJHJ1bGVzJGNoZWNrS2V5MiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3J1bGUkcnVsZXMkY2hlY2tLZXkyW3N0YXRlXTtcbn1cblxuZnVuY3Rpb24gaGFzSlNPTkhlYWRlcihoZWFkZXJzKSB7XG4gIHJldHVybiBoZWFkZXJzLnNvbWUoaGVhZGVyID0+IGhlYWRlci5uYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdjb250ZW50LXR5cGUnICYmIGhlYWRlci52YWx1ZS5pbmNsdWRlcygnYXBwbGljYXRpb24vanNvbicpKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVwbGFjZVJlc3BvbnNlKHJlcXVlc3RQYXJhbXMsIHByb3RvUmVzcG9uc2UsIHNjcmlwdCkge1xuICBjb25zdCBpc1Jlc3BvbnNlSlNPTiA9IGhhc0pTT05IZWFkZXIocmVxdWVzdFBhcmFtcy5yZXNwb25zZUhlYWRlcnMpO1xuICBjb25zdCByZXF1ZXN0ID0gcmVxdWVzdFBhcmFtcy5yZXF1ZXN0O1xuICBjb25zdCByZXNwb25zZSA9IHtcbiAgICBjb2RlOiByZXF1ZXN0UGFyYW1zLnJlc3BvbnNlU3RhdHVzQ29kZSxcbiAgICBib2R5OiBwcm90b1Jlc3BvbnNlLmJhc2U2NEVuY29kZWQgPyBhdG9iKHByb3RvUmVzcG9uc2UuYm9keSkgOiBwcm90b1Jlc3BvbnNlLmJvZHksXG4gICAgaGVhZGVyczogcmVxdWVzdFBhcmFtcy5yZXNwb25zZUhlYWRlcnNcbiAgfTtcblxuICBpZiAoaXNSZXNwb25zZUpTT04pIHtcbiAgICB0cnkge1xuICAgICAgcmVzcG9uc2UuYm9keSA9IEpTT04ucGFyc2UocmVzcG9uc2UuYm9keSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICB9XG4gIH1cblxuICBldmFsU2NyaXB0KHNjcmlwdCwge1xuICAgIHJlcXVlc3QsXG4gICAgcmVzcG9uc2VcbiAgfSk7XG5cbiAgaWYgKGlzUmVzcG9uc2VKU09OKSB7XG4gICAgcmVzcG9uc2UuYm9keSA9IEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlLmJvZHkpO1xuICB9XG5cbiAgaWYgKHByb3RvUmVzcG9uc2UuYmFzZTY0RW5jb2RlZCAmJiB0eXBlb2YgcmVzcG9uc2UuYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXNwb25zZS5ib2R5ID0gYnRvYShyZXNwb25zZS5ib2R5KTtcbiAgfVxuXG4gIHJldHVybiByZXNwb25zZTtcbn1cblxubGV0IGN1cnJlbnREZWJ1Z2dlZSA9IHVuZGVmaW5lZDtcbmxldCBjdXJyZW50RGVidWdUYWIgPSB1bmRlZmluZWQ7XG5sZXQgY3VycmVudFJ1bGVzID0gdW5kZWZpbmVkO1xuXG5hc3luYyBmdW5jdGlvbiBoaWphY2tSZXF1ZXN0KHVybCwgc2NyaXB0UnVsZSwgcGFyYW1zKSB7XG4gIGNocm9tZS5kZWJ1Z2dlci5zZW5kQ29tbWFuZChjdXJyZW50RGVidWdnZWUsICdGZXRjaC5nZXRSZXNwb25zZUJvZHknLCB7XG4gICAgcmVxdWVzdElkOiBwYXJhbXMucmVxdWVzdElkXG4gIH0sIGFzeW5jIGZ1bmN0aW9uIChwcm90b1Jlc3BvbnNlKSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCByZXBsYWNlUmVzcG9uc2UocGFyYW1zLCBwcm90b1Jlc3BvbnNlLCBzY3JpcHRSdWxlLmhhbmRsZXJGdW5jdGlvblNjcmlwdCk7XG4gICAgY2hyb21lLmRlYnVnZ2VyLnNlbmRDb21tYW5kKGN1cnJlbnREZWJ1Z2dlZSwgJ0ZldGNoLmZ1bGZpbGxSZXF1ZXN0Jywge1xuICAgICAgcmVxdWVzdElkOiBwYXJhbXMucmVxdWVzdElkLFxuICAgICAgcmVzcG9uc2VDb2RlOiByZXNwb25zZS5jb2RlLFxuICAgICAgcmVzcG9uc2VIZWFkZXJzOiByZXNwb25zZS5oZWFkZXJzLFxuICAgICAgYm9keTogcmVzcG9uc2UuYm9keVxuICAgIH0sICgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGBSZXF1ZXN0ICR7dXJsfSBpbnRlcmNlcHRlZCBhbmQgbW9kaWZpZWQuYCk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBoaWphY2tSdWxlKHRhYikge1xuICBjaHJvbWUuZGVidWdnZXIuZ2V0VGFyZ2V0cyh0YXJnZXRzID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSB0YXJnZXRzLmZpbmQodCA9PiB0LnRhYklkID09PSB0YWIuaWQpO1xuXG4gICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgIGNvbnNvbGUud2Fybignbm8gdGFyZ2V0IGZvdW5kJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY3VycmVudERlYnVnZ2VlID0ge1xuICAgICAgdGFyZ2V0SWQ6IHRhcmdldC5pZFxuICAgIH07XG4gICAgY3VycmVudERlYnVnVGFiID0gdGFiLmlkO1xuICAgIGNocm9tZS5kZWJ1Z2dlci5hdHRhY2goY3VycmVudERlYnVnZ2VlLCAnMS4yJywgKCkgPT4ge1xuICAgICAgY2hyb21lLmRlYnVnZ2VyLnNlbmRDb21tYW5kKGN1cnJlbnREZWJ1Z2dlZSwgJ05ldHdvcmsuZW5hYmxlJywge30pO1xuICAgICAgY2hyb21lLmRlYnVnZ2VyLnNlbmRDb21tYW5kKGN1cnJlbnREZWJ1Z2dlZSwgJ0ZldGNoLmVuYWJsZScsIHtcbiAgICAgICAgcGF0dGVybnM6IFt7XG4gICAgICAgICAgcmVxdWVzdFN0YWdlOiAnUmVzcG9uc2UnXG4gICAgICAgIH1dXG4gICAgICB9LCAoKSA9PiB7XG4gICAgICAgIGNocm9tZS5kZWJ1Z2dlci5vbkV2ZW50LmFkZExpc3RlbmVyKChzb3VyY2UsIG1ldGhvZCwgcGFyYW1zKSA9PiB7XG4gICAgICAgICAgaWYgKHNvdXJjZS50YXJnZXRJZCA9PT0gdGFyZ2V0LmlkICYmIG1ldGhvZCA9PT0gJ0ZldGNoLnJlcXVlc3RQYXVzZWQnKSB7XG4gICAgICAgICAgICBjb25zdCByZXF1ZXN0UGFyYW0gPSBwYXJhbXM7XG4gICAgICAgICAgICBjb25zdCByZXF1ZXN0SWQgPSByZXF1ZXN0UGFyYW0ucmVxdWVzdElkO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gcmVxdWVzdFBhcmFtLnJlcXVlc3QudXJsO1xuICAgICAgICAgICAgY29uc3QgcmVxdWVzdFJ1bGUgPSBnZXRVcmxSdWxlKGN1cnJlbnRSdWxlcywgdXJsLCAncmVzcG9uc2UnKTtcblxuICAgICAgICAgICAgaWYgKCFyZXF1ZXN0UnVsZSkge1xuICAgICAgICAgICAgICBjaHJvbWUuZGVidWdnZXIuc2VuZENvbW1hbmQoY3VycmVudERlYnVnZ2VlLCAnRmV0Y2guY29udGludWVSZXF1ZXN0Jywge1xuICAgICAgICAgICAgICAgIHJlcXVlc3RJZFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBoaWphY2tSZXF1ZXN0KHVybCwgcmVxdWVzdFJ1bGUsIHJlcXVlc3RQYXJhbSk7XG4gICAgICAgICAgfSAvLyBlbHNlIHtcbiAgICAgICAgICAvLyAgICAgY2hyb21lLmRlYnVnZ2VyLnNlbmRDb21tYW5kKHsgdGFiSWQ6IHRhYklkIH0sICdGZXRjaC5jb250aW51ZVJlcXVlc3QnLCB7XG4gICAgICAgICAgLy8gICAgICAgICByZXF1ZXN0SWQ6IHBhcmFtcy5yZXF1ZXN0SWQsXG4gICAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAgIC8vIH1cblxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZGV0YWNoRGVidWcoKSB7XG4gIGlmIChjdXJyZW50RGVidWdnZWUpIHtcbiAgICBjaHJvbWUuZGVidWdnZXIuZGV0YWNoKGN1cnJlbnREZWJ1Z2dlZSk7XG4gIH1cblxuICBjdXJyZW50RGVidWdnZWUgPSB1bmRlZmluZWQ7XG4gIHdhdGNoaW5nTWFwLmRlbGV0ZShjdXJyZW50RGVidWdUYWIpO1xuICBjdXJyZW50RGVidWdUYWIgPSB1bmRlZmluZWQ7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUh0dHBXYXRjaGVyKHRhYikge1xuICBuZXR3b3JrUnVsZUhhbmRsZXIucmVmcmVzaCgpO1xuXG4gIGlmICghbmV0d29ya1J1bGVIYW5kbGVyLmVuYWJsZSkge1xuICAgIGRldGFjaERlYnVnKCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKCF0YWIudXJsIHx8ICF0YWIuaWQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgcnVsZXMgPSBhd2FpdCBuZXR3b3JrUnVsZUhhbmRsZXIuZ2V0TmV0d29ya1J1bGUodGFiLnVybCwgdHJ1ZSk7XG4gIGNvbnNvbGUubG9nKCduZXR3b3JrIHJ1bGVzJywgdGFiLmlkLCB0YWIudXJsLCBydWxlcyk7XG5cbiAgaWYgKCFydWxlcykge1xuICAgIGlmIChjdXJyZW50RGVidWdUYWIgPT09IHRhYi5pZCkge1xuICAgICAgZGV0YWNoRGVidWcoKTtcbiAgICB9XG5cbiAgICByZXR1cm47XG4gIH1cblxuICBjdXJyZW50UnVsZXMgPSBydWxlcztcblxuICBpZiAod2F0Y2hpbmdNYXAuaGFzKHRhYi5pZCkpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB3YXRjaGluZ01hcC5hZGQodGFiLmlkKTtcbiAgaGlqYWNrUnVsZSh0YWIpO1xufVxuXG5jb25zdCBkZWJvdW5jZVVwZGF0ZUh0dHBXYXRjaGVyID0gZGVib3VuY2UodXBkYXRlSHR0cFdhdGNoZXIsIDUwMCk7IC8vIGh0dHBzOi8vZGV2ZWxvcGVyLmNocm9tZS5jb20vZG9jcy9leHRlbnNpb25zL3JlZmVyZW5jZS93ZWJSZXF1ZXN0L1xuXG5jaHJvbWUudGFicy5vbkNyZWF0ZWQuYWRkTGlzdGVuZXIodGFiID0+IHtcbiAgZGVib3VuY2VVcGRhdGVIdHRwV2F0Y2hlcih0YWIpO1xufSk7XG5jaHJvbWUudGFicy5vblVwZGF0ZWQuYWRkTGlzdGVuZXIoYXN5bmMgdGFiSWQgPT4ge1xuICBjb25zdCB0YWIgPSBhd2FpdCBnZXRUYWIodGFiSWQpO1xuICBkZWJvdW5jZVVwZGF0ZUh0dHBXYXRjaGVyKHRhYik7XG59KTtcbmNocm9tZS50YWJzLm9uUmVtb3ZlZC5hZGRMaXN0ZW5lcihhc3luYyB0YWJJZCA9PiB7XG4gIGlmICh0YWJJZCA9PT0gY3VycmVudERlYnVnVGFiKSB7XG4gICAgZGV0YWNoRGVidWcoKTtcbiAgfVxufSk7XG5uZXR3b3JrUnVsZUhhbmRsZXIucmVmcmVzaCgpOyIsImltcG9ydCB7IG9uUnVudGltZU1lc3NhZ2UsIHNlbmRUYWJNZXNzYWdlIH0gZnJvbSAnLi4vLi4vdXRpbHMnOyAvLyDlrZjlhoXlrZjjgILlhbPmtY/op4jlmajkuKJcblxuY29uc3Qgb3ZlcmxheU1hcCA9IG5ldyBNYXAoKTtcbmNvbnNvbGUubG9nKCdjYXB0dXJlIGJhY2tncm91bmQgcmVhZHknLCBvdmVybGF5TWFwKTtcbm9uUnVudGltZU1lc3NhZ2UoJ3NldE92ZXJsYXlDYXB0dXJlJywgKGRhdGEsIHNlbmRlciwgcmVzcG9uc2UpID0+IHtcbiAgbGV0IFtjdXJyZW50VGFiSWQsIGNhcHR1cmVEYXRhXSA9IGRhdGE7IC8vIGNvbnNvbGUubG9nKCdzZXRPdmVybGF5Q2FwdHVyZScsIGN1cnJlbnRUYWJJZCk7XG4gIC8vIOepuueahGJhc2U2NOaYryBkYXRhOixcblxuICBpZiAoIShjYXB0dXJlRGF0YSAhPT0gbnVsbCAmJiBjYXB0dXJlRGF0YSAhPT0gdm9pZCAwICYmIGNhcHR1cmVEYXRhLmJhc2U2NCkgfHwgY2FwdHVyZURhdGEuYmFzZTY0Lmxlbmd0aCA8IDEwKSB7XG4gICAgb3ZlcmxheU1hcC5kZWxldGUoY3VycmVudFRhYklkKTtcbiAgfSBlbHNlIHtcbiAgICBvdmVybGF5TWFwLnNldChjdXJyZW50VGFiSWQsIGNhcHR1cmVEYXRhKTtcbiAgICByZXNwb25zZSgpO1xuICB9IC8vIGNvbnNvbGUubG9nKCdzZW5kVGFiTWVzc2FnZSB1cGRhdGVPdmVybGF5Q2FwdHVyZScsIGN1cnJlbnRUYWJJZCwgb3ZlcmxheU1hcC5nZXQoY3VycmVudFRhYklkKSk7XG5cblxuICBpZiAobmV3IFVSTChzZW5kZXIub3JpZ2luID8/ICcnKS5wcm90b2NvbCA9PT0gJ2Nocm9tZS1leHRlbnNpb246Jykge1xuICAgIHNlbmRUYWJNZXNzYWdlKCd1cGRhdGVPdmVybGF5Q2FwdHVyZScsIGN1cnJlbnRUYWJJZCwgW292ZXJsYXlNYXAuZ2V0KGN1cnJlbnRUYWJJZCldKTtcbiAgfVxufSk7XG5vblJ1bnRpbWVNZXNzYWdlKCdnZXRPdmVybGF5Q2FwdHVyZScsIChkYXRhLCBzZW5kZXIsIHJlc3BvbnNlKSA9PiB7XG4gIGxldCBbY3VycmVudFRhYklkXSA9IGRhdGE7XG4gIGNvbnN0IGNhcHR1cmVEYXRhID0gb3ZlcmxheU1hcC5nZXQoY3VycmVudFRhYklkKTtcbiAgcmVzcG9uc2UoY2FwdHVyZURhdGEpO1xufSk7IiwiLy8gdGFicyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFNlbGVjdGVkKCkge1xuICByZXR1cm4gbmV3IFByb21pc2UocmVzID0+IHtcbiAgICBjaHJvbWUudGFicy5nZXRTZWxlY3RlZChmdW5jdGlvbiAodGFiKSB7XG4gICAgICByZXModGFiKTtcbiAgICB9KTtcbiAgfSk7XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Q3VycmVudFRhYigpIHtcbiAgcmV0dXJuIGNocm9tZS50YWJzLmdldEN1cnJlbnQoKTtcbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRUYWIodGFiSWQpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuICAgIGNocm9tZS50YWJzLmdldCh0YWJJZCwgdGFiID0+IHtcbiAgICAgIHJlcyh0YWIpO1xuICAgIH0pO1xuICB9KTtcbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBbGxUYWJzKCkge1xuICByZXR1cm4gbmV3IFByb21pc2UocmVzID0+IHtcbiAgICBjaHJvbWUudGFicy5xdWVyeSh7fSwgdGFicyA9PiB7XG4gICAgICByZXModGFicyk7XG4gICAgfSk7XG4gIH0pO1xufSAvLyBtZXNzYWdlID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBleHBvcnQgZnVuY3Rpb24gc2VuZFRvQ29udGVudChtZXNzYWdlOiBzdHJpbmcsIGNhbGxiYWNrOiBDb21tb25DYWxsYmFjaykge1xuLy8gICAgIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sIGZ1bmN0aW9uICh0YWJzKSB7XG4vLyAgICAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKHRhYnNbMF0hLmlkISwgbWVzc2FnZSwgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4vLyAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKHJlc3BvbnNlKTtcbi8vICAgICAgICAgfSk7XG4vLyAgICAgfSk7XG4vLyB9XG4vLyBleHBvcnQgZnVuY3Rpb24gY29udGVudE9uTWVzc2FnZShjYWxsYmFjazogQ29tbW9uQ2FsbGJhY2spIHtcbi8vICAgICBjaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKHJlcXVlc3QsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSB7XG4vLyAgICAgICAgIGlmIChzZW5kZXIudGFiKSB7XG4vLyAgICAgICAgICAgICByZXR1cm47XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2socmVxdWVzdCk7XG4vLyAgICAgfSk7XG4vLyB9XG4vLyBwb3B1cCA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5leHBvcnQgY29uc3QgcG9wdXBNYXhXaWR0aCA9IDUwMDtcbmV4cG9ydCBjb25zdCBwb3B1cE1heEhlaWdodCA9IDYwMDtcbmV4cG9ydCBjb25zdCBwb3B1cE1pbldpZHRoID0gMjAwO1xuZXhwb3J0IGZ1bmN0aW9uIHNldEJvZHlTaXplKG1heFdpZHRoLCBtYXhIZWlnaHQpIHtcbiAgJCgnI21haW4nKS5zdHlsZS53aWR0aCA9IGAke21heFdpZHRoID8gcG9wdXBNYXhXaWR0aCA6IHBvcHVwTWluV2lkdGh9cHhgO1xuXG4gIGlmICh0eXBlb2YgbWF4SGVpZ2h0ID09PSAnYm9vbGVhbicpIHtcbiAgICAkKCcjbWFpbicpLnN0eWxlLmhlaWdodCA9IG1heEhlaWdodCA/IGAke3BvcHVwTWF4SGVpZ2h0fXB4YCA6ICcnO1xuICB9XG59IC8vIGVudiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5leHBvcnQgdmFyIEV4ZWNFbnY7XG5cbihmdW5jdGlvbiAoRXhlY0Vudikge1xuICBFeGVjRW52W0V4ZWNFbnZbXCJCYWNrZ3JvdW5kXCJdID0gMF0gPSBcIkJhY2tncm91bmRcIjtcbiAgRXhlY0VudltFeGVjRW52W1wiUG9wdXBcIl0gPSAxXSA9IFwiUG9wdXBcIjtcbiAgRXhlY0VudltFeGVjRW52W1wiQ29udGVudFwiXSA9IDJdID0gXCJDb250ZW50XCI7XG59KShFeGVjRW52IHx8IChFeGVjRW52ID0ge30pKTtcblxuZnVuY3Rpb24gZ2V0Q3VycmVudEVudigpIHtcbiAgaWYgKCFjaHJvbWUuZXh0ZW5zaW9uLmdldEJhY2tncm91bmRQYWdlKSB7XG4gICAgcmV0dXJuIEV4ZWNFbnYuQ29udGVudDtcbiAgfVxuXG4gIGlmIChjaHJvbWUuZXh0ZW5zaW9uLmdldEJhY2tncm91bmRQYWdlKCkgPT09IHdpbmRvdykge1xuICAgIHJldHVybiBFeGVjRW52LkJhY2tncm91bmQ7XG4gIH1cblxuICByZXR1cm4gRXhlY0Vudi5Qb3B1cDtcbn1cblxuZXhwb3J0IGNvbnN0IGN1cnJlbnRFbnYgPSBnZXRDdXJyZW50RW52KCk7IiwiZXhwb3J0IGZ1bmN0aW9uIGJpbmREcmFnZ2VyKG5vZGUsIHN0YXJ0WEdldHRlciwgc3RhcnRZR2V0dGVyLCBvblVwZGF0ZSkge1xuICBsZXQgZHJhZ2dpbmcgPSBmYWxzZTtcbiAgbGV0IHN0YXJ0WCA9IDA7XG4gIGxldCBzdGFydFkgPSAwO1xuICBsZXQgb2Zmc2V0WCA9IDA7XG4gIGxldCBvZmZzZXRZID0gMDtcbiAgbm9kZS5kcmFnZ2FibGUgPSBmYWxzZTtcbiAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBlID0+IHtcbiAgICBpZiAoIW5vZGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBkcmFnZ2luZyA9IHRydWU7XG4gICAgc3RhcnRYID0gc3RhcnRYR2V0dGVyKCk7XG4gICAgc3RhcnRZID0gc3RhcnRZR2V0dGVyKCk7XG4gICAgb2Zmc2V0WCA9IGUucGFnZVg7XG4gICAgb2Zmc2V0WSA9IGUucGFnZVk7XG4gIH0pO1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZSA9PiB7XG4gICAgaWYgKCFub2RlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFkcmFnZ2luZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG9uVXBkYXRlKGUucGFnZVggLSBvZmZzZXRYICsgc3RhcnRYLCBlLnBhZ2VZIC0gb2Zmc2V0WSArIHN0YXJ0WSk7XG4gIH0pO1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGUgPT4ge1xuICAgIGlmICghbm9kZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghZHJhZ2dpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBkcmFnZ2luZyA9IGZhbHNlO1xuICB9KTtcbn0iLCJleHBvcnQgKiBmcm9tICcuL21lc3NhZ2UnO1xuZXhwb3J0ICogZnJvbSAnLi9kcmFnZ2VyJztcbmV4cG9ydCAqIGZyb20gJy4vc3RvcmFnZSc7XG5leHBvcnQgKiBmcm9tICcuL2Nocm9tZSc7XG5leHBvcnQgKiBmcm9tICcuL3Rvb2xzJzsgLy8gZWRpdG9yIOWNleeLrOW8lSIsImV4cG9ydCBmdW5jdGlvbiBvblJ1bnRpbWVNZXNzYWdlKGNoYW5uZWwsIGNhbGxiYWNrKSB7XG4gIGNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbiAocmVxdWVzdCwgc2VuZGVyLCByZXNwb25zZSkge1xuICAgIGlmIChyZXF1ZXN0LmNoYW5uZWwgIT09IGNoYW5uZWwpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY2FsbGJhY2socmVxdWVzdC5kYXRhLCBzZW5kZXIsIHJlc3BvbnNlKTtcbiAgICB9LCAxKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSk7XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VuZFJ1bnRpbWVNZXNzYWdlKGNoYW5uZWwsIGRhdGEsIG9uUmVzcG9uc2UpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKHJlcyA9PiB7XG4gICAgaWYgKG9uUmVzcG9uc2UpIHtcbiAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICAgICAgY2hhbm5lbCxcbiAgICAgICAgZGF0YVxuICAgICAgfSwgZGF0YSA9PiB7XG4gICAgICAgIG9uUmVzcG9uc2UoZGF0YSk7XG4gICAgICAgIHJlcyhkYXRhKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICAgIGNoYW5uZWwsXG4gICAgICAgIGRhdGFcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gc2VuZFRhYk1lc3NhZ2UoY2hhbm5lbCwgdGFiSWQsIGRhdGEpIHtcbiAgcmV0dXJuIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKHRhYklkLCB7XG4gICAgY2hhbm5lbCxcbiAgICBkYXRhXG4gIH0pO1xufSIsImltcG9ydCB7IGN1cnJlbnRFbnYsIEV4ZWNFbnYgfSBmcm9tICcuL2Nocm9tZSc7IC8vIHN0b3JhZ2UgPT09PT09PT09PT09PVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TG9jYWxTdG9yYWdlKG5hbWUsIGRlZmF1bHRWYWx1ZSkge1xuICByZXR1cm4gbmV3IFByb21pc2UocmVzID0+IHtcbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQobmFtZSwgcnMgPT4gcmVzKChycyA9PT0gbnVsbCB8fCBycyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcnNbbmFtZV0pID8/IGRlZmF1bHRWYWx1ZSkpO1xuICB9KTtcbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZXRMb2NhbFN0b3JhZ2UobmFtZSwgdmFsdWUpIHtcbiAgYXdhaXQgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHtcbiAgICBbbmFtZV06IHZhbHVlXG4gIH0pO1xufVxuY29uc3Qgc3RvcmFnZUhhbmRsZXJTdG9yZSA9IG5ldyBNYXAoKTtcbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlclN0b3JhZ2Uoa2V5LCBoYW5kbGVyKSB7XG4gIHN0b3JhZ2VIYW5kbGVyU3RvcmUuc2V0KGtleSwgaGFuZGxlcik7XG5cbiAgaWYgKGN1cnJlbnRFbnYgIT09IEV4ZWNFbnYuQ29udGVudCkge1xuICAgIGNvbnNvbGUubG9nKGBbc3RvcmFnZV0gcmVnaXN0ZXIgbW9kdWxlOiAke2tleX1gKTtcbiAgfVxufVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFN0b3JhZ2VFeHBvcnREYXRhKCkge1xuICBjb25zdCBkYXRhID0ge307XG5cbiAgZm9yIChsZXQgW2tleSwgaGFuZGxlcl0gb2Ygc3RvcmFnZUhhbmRsZXJTdG9yZSkge1xuICAgIGlmIChoYW5kbGVyKSB7XG4gICAgICBkYXRhW2tleV0gPSBhd2FpdCBoYW5kbGVyLm9uRXhwb3J0KCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGRhdGEsIG51bGwsIDQpO1xufVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNldFN0b3JhZ2VJbXBvcnREYXRhKGRhdGEpIHtcbiAgY29uc3QgZGF0YU9iamVjdCA9IEpTT04ucGFyc2UoZGF0YSk7XG5cbiAgZm9yIChsZXQgW2tleSwgaGFuZGxlcl0gb2Ygc3RvcmFnZUhhbmRsZXJTdG9yZSkge1xuICAgIGNvbnN0IGltcG9ydERhdGEgPSBkYXRhT2JqZWN0W2tleV07XG5cbiAgICBpZiAoaW1wb3J0RGF0YSkge1xuICAgICAgYXdhaXQgKGhhbmRsZXIgPT09IG51bGwgfHwgaGFuZGxlciA9PT0gdm9pZCAwID8gdm9pZCAwIDogaGFuZGxlci5vbkltcG9ydChpbXBvcnREYXRhKSk7XG4gICAgfVxuICB9XG59IiwiZXhwb3J0IGZ1bmN0aW9uIGV2YWxTY3JpcHQoc2NyaXB0KSB7XG4gIGxldCB2YXJPYmogPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICBjb25zdCB2YXJOYW1lcyA9IFtdO1xuICBjb25zdCB2YXJEYXRhID0gW107XG4gIE9iamVjdC5lbnRyaWVzKHZhck9iaikuZm9yRWFjaChfcmVmID0+IHtcbiAgICBsZXQgW25hbWUsIGRhdGFdID0gX3JlZjtcbiAgICB2YXJOYW1lcy5wdXNoKG5hbWUpO1xuICAgIHZhckRhdGEucHVzaChkYXRhKTtcbiAgfSk7XG4gIHJldHVybiBuZXcgRnVuY3Rpb24oLi4udmFyTmFtZXMsIGBcInVzZSBzdHJpY3RcIjske3NjcmlwdH1gKSguLi52YXJEYXRhKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiAkKHNlbGVjdG9yKSB7XG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBkZWJvdW5jZShmbikge1xuICBsZXQgZGVsYXkgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IDMwMDtcbiAgbGV0IHRpbWVyID0gdW5kZWZpbmVkO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgIHRpbWVyID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4gZm4oLi4uYXJncyksIGRlbGF5KTtcbiAgfTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzbGVlcCgpIHtcbiAgbGV0IG4gPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IDA7XG4gIHJldHVybiBuZXcgUHJvbWlzZShyZXMgPT4ge1xuICAgIHNldFRpbWVvdXQocmVzLCBuKTtcbiAgfSk7XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9hZEltYWdlKHNyYykge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG4gICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG5cbiAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgcmVzKGltZyk7XG4gICAgfTtcblxuICAgIGltZy5vbmVycm9yID0gcmVqO1xuICAgIGltZy5zcmMgPSBzcmM7XG4gIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGFycmF5R3JvdXBCeShhcnJheSwgY29uZGl0aW9uKSB7XG4gIGNvbnN0IG1hcCA9IG5ldyBNYXAoKTtcbiAgYXJyYXkuZm9yRWFjaChpdGVtID0+IHtcbiAgICBjb25zdCB2YWx1ZSA9IGNvbmRpdGlvbihpdGVtKTtcblxuICAgIGlmICghbWFwLmhhcyh2YWx1ZSkpIHtcbiAgICAgIG1hcC5zZXQodmFsdWUsIFtdKTtcbiAgICB9XG5cbiAgICBtYXAuZ2V0KHZhbHVlKS5wdXNoKGl0ZW0pO1xuICB9KTtcbiAgcmV0dXJuIFsuLi5tYXAudmFsdWVzKCldO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGluc2VydFRlbXBsYXRlKHRlbXBsYXRlKSB7XG4gIHJldHVybiAkKCcjbWFpbicpLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgdGVtcGxhdGUpO1xufSAvLyBleHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9hZFNjcmlwdChzcmM6IHN0cmluZykge1xuLy8gICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbi8vICAgICAgICAgY29uc3QgcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuLy8gICAgICAgICBzLnNyYyA9IHNyYztcbi8vICAgICAgICAgcy5vbmxvYWQgPSByZXM7XG4vLyAgICAgICAgIHMub25lcnJvciA9IHJlajtcbi8vICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzKTtcbi8vICAgICB9KTtcbi8vIH1cblxuZXhwb3J0IGZ1bmN0aW9uIGRvd25sb2FkKGZpbGVOYW1lLCB1cmwpIHtcbiAgY29uc3QgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgYS5ocmVmID0gdXJsO1xuICBhLmRvd25sb2FkID0gZmlsZU5hbWU7XG4gIGEuY2xpY2soKTtcbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZWFkRmlsZShmaWxlKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgICBjb25zdCBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICBmaWxlUmVhZGVyLnJlYWRBc1RleHQoZmlsZSk7XG5cbiAgICBmaWxlUmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IGZpbGVDb250ZW50ID0gZmlsZVJlYWRlci5yZXN1bHQ7XG4gICAgICByZXMoZmlsZUNvbnRlbnQpO1xuICAgIH07XG5cbiAgICBmaWxlUmVhZGVyLm9uZXJyb3IgPSByZWo7XG4gIH0pO1xufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qc1wiKTtcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2JhY2tncm91bmQvYmFja2dyb3VuZC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==