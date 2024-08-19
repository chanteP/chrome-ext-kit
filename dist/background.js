/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../../.config/yarn/global/node_modules/regenerator-runtime/runtime.js":
/*!********************************************************************************!*\
  !*** ../../../.config/yarn/global/node_modules/regenerator-runtime/runtime.js ***!
  \********************************************************************************/
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
  var defineProperty = Object.defineProperty || function (obj, key, desc) {
    obj[key] = desc.value;
  };
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
    var context = new Context(tryLocsList || []);
    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    });
    return generator;
  }
  exports.wrap = wrap;
  // Try/catch helper to minimize deoptimizations. Returns a completion
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
  var GenStateCompleted = "completed";
  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};
  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  // This is a polyfill for %IteratorPrototype% for environments that
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
  defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: true
  });
  defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: true
  });
  GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction");
  // Helper for defining the .next, .throw, and .return methods of the
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
    return ctor ? ctor === GeneratorFunction ||
    // For the native GeneratorFunction constructor, the best we can
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
  };
  // Within the body of any async function, `await x` is transformed to
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
      return previousPromise =
      // If enqueue has been called before, then we want to wait until
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
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,
      // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    }
    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    defineProperty(this, "_invoke", {
      value: enqueue
    });
  }
  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;
  // Note that simple async functions are implemented on top of
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
        }
        // Be forgiving, per 25.3.3.3.3 of the spec:
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
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }
  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method;
    var method = delegate.iterator[methodName];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method, or a missing .next mehtod, always terminate the
      // yield* loop.
      context.delegate = null;
      // Note: ["return"] must be used for ES3 parsing compatibility.
      if (methodName === "throw" && delegate.iterator["return"]) {
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
      if (methodName !== "return") {
        context.method = "throw";
        context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method");
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
      context[delegate.resultName] = info.value;
      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;
      // If context.method was "throw" but the delegate handled the
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
    }
    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }
  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);
  define(Gp, toStringTagSymbol, "Generator");
  // A Generator should always return itself as the iterator object when the
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
  exports.keys = function (val) {
    var object = Object(val);
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();
    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }
      // To avoid creating an additional object, we just hang the .value
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
    }
    // Return an iterator with no values.
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
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
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
      }
      // The context.catch method must only be called with a location
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
  };
  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;
}(
// If this script is executing as a CommonJS module, use module.exports
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

/***/ "./node_modules/@huggingface/inference/dist/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/@huggingface/inference/dist/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HfInference": () => (/* binding */ HfInference),
/* harmony export */   "HfInferenceEndpoint": () => (/* binding */ HfInferenceEndpoint),
/* harmony export */   "InferenceOutputError": () => (/* binding */ InferenceOutputError),
/* harmony export */   "audioClassification": () => (/* binding */ audioClassification),
/* harmony export */   "audioToAudio": () => (/* binding */ audioToAudio),
/* harmony export */   "automaticSpeechRecognition": () => (/* binding */ automaticSpeechRecognition),
/* harmony export */   "chatCompletion": () => (/* binding */ chatCompletion),
/* harmony export */   "chatCompletionStream": () => (/* binding */ chatCompletionStream),
/* harmony export */   "documentQuestionAnswering": () => (/* binding */ documentQuestionAnswering),
/* harmony export */   "featureExtraction": () => (/* binding */ featureExtraction),
/* harmony export */   "fillMask": () => (/* binding */ fillMask),
/* harmony export */   "imageClassification": () => (/* binding */ imageClassification),
/* harmony export */   "imageSegmentation": () => (/* binding */ imageSegmentation),
/* harmony export */   "imageToImage": () => (/* binding */ imageToImage),
/* harmony export */   "imageToText": () => (/* binding */ imageToText),
/* harmony export */   "objectDetection": () => (/* binding */ objectDetection),
/* harmony export */   "questionAnswering": () => (/* binding */ questionAnswering),
/* harmony export */   "request": () => (/* binding */ request),
/* harmony export */   "sentenceSimilarity": () => (/* binding */ sentenceSimilarity),
/* harmony export */   "streamingRequest": () => (/* binding */ streamingRequest),
/* harmony export */   "summarization": () => (/* binding */ summarization),
/* harmony export */   "tableQuestionAnswering": () => (/* binding */ tableQuestionAnswering),
/* harmony export */   "tabularClassification": () => (/* binding */ tabularClassification),
/* harmony export */   "tabularRegression": () => (/* binding */ tabularRegression),
/* harmony export */   "textClassification": () => (/* binding */ textClassification),
/* harmony export */   "textGeneration": () => (/* binding */ textGeneration),
/* harmony export */   "textGenerationStream": () => (/* binding */ textGenerationStream),
/* harmony export */   "textToImage": () => (/* binding */ textToImage),
/* harmony export */   "textToSpeech": () => (/* binding */ textToSpeech),
/* harmony export */   "tokenClassification": () => (/* binding */ tokenClassification),
/* harmony export */   "translation": () => (/* binding */ translation),
/* harmony export */   "visualQuestionAnswering": () => (/* binding */ visualQuestionAnswering),
/* harmony export */   "zeroShotClassification": () => (/* binding */ zeroShotClassification),
/* harmony export */   "zeroShotImageClassification": () => (/* binding */ zeroShotImageClassification)
/* harmony export */ });
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all) __defProp(target, name, {
    get: all[name],
    enumerable: true
  });
};
// src/tasks/index.ts
var tasks_exports = {};
__export(tasks_exports, {
  audioClassification: () => audioClassification,
  audioToAudio: () => audioToAudio,
  automaticSpeechRecognition: () => automaticSpeechRecognition,
  chatCompletion: () => chatCompletion,
  chatCompletionStream: () => chatCompletionStream,
  documentQuestionAnswering: () => documentQuestionAnswering,
  featureExtraction: () => featureExtraction,
  fillMask: () => fillMask,
  imageClassification: () => imageClassification,
  imageSegmentation: () => imageSegmentation,
  imageToImage: () => imageToImage,
  imageToText: () => imageToText,
  objectDetection: () => objectDetection,
  questionAnswering: () => questionAnswering,
  request: () => request,
  sentenceSimilarity: () => sentenceSimilarity,
  streamingRequest: () => streamingRequest,
  summarization: () => summarization,
  tableQuestionAnswering: () => tableQuestionAnswering,
  tabularClassification: () => tabularClassification,
  tabularRegression: () => tabularRegression,
  textClassification: () => textClassification,
  textGeneration: () => textGeneration,
  textGenerationStream: () => textGenerationStream,
  textToImage: () => textToImage,
  textToSpeech: () => textToSpeech,
  tokenClassification: () => tokenClassification,
  translation: () => translation,
  visualQuestionAnswering: () => visualQuestionAnswering,
  zeroShotClassification: () => zeroShotClassification,
  zeroShotImageClassification: () => zeroShotImageClassification
});
// src/utils/pick.ts
function pick(o, props) {
  return Object.assign({}, ...props.map(prop => {
    if (o[prop] !== void 0) {
      return {
        [prop]: o[prop]
      };
    }
  }));
}
// src/utils/typedInclude.ts
function typedInclude(arr, v) {
  return arr.includes(v);
}
// src/utils/omit.ts
function omit(o, props) {
  const propsArr = Array.isArray(props) ? props : [props];
  const letsKeep = Object.keys(o).filter(prop => !typedInclude(propsArr, prop));
  return pick(o, letsKeep);
}
// src/lib/isUrl.ts
function isUrl(modelOrUrl) {
  return /^http(s?):/.test(modelOrUrl) || modelOrUrl.startsWith("/");
}
// src/lib/getDefaultTask.ts
var taskCache = /* @__PURE__ */new Map();
var CACHE_DURATION = 10 * 60 * 1e3;
var MAX_CACHE_ITEMS = 1e3;
var HF_HUB_URL = "https://huggingface.co";
async function getDefaultTask(model, accessToken, options) {
  if (isUrl(model)) {
    return null;
  }
  const key = `${model}:${accessToken}`;
  let cachedTask = taskCache.get(key);
  if (cachedTask && cachedTask.date < new Date(Date.now() - CACHE_DURATION)) {
    taskCache.delete(key);
    cachedTask = void 0;
  }
  if (cachedTask === void 0) {
    const modelTask = await (options?.fetch ?? fetch)(`${HF_HUB_URL}/api/models/${model}?expand[]=pipeline_tag`, {
      headers: accessToken ? {
        Authorization: `Bearer ${accessToken}`
      } : {}
    }).then(resp => resp.json()).then(json => json.pipeline_tag).catch(() => null);
    if (!modelTask) {
      return null;
    }
    cachedTask = {
      task: modelTask,
      date: /* @__PURE__ */new Date()
    };
    taskCache.set(key, {
      task: modelTask,
      date: /* @__PURE__ */new Date()
    });
    if (taskCache.size > MAX_CACHE_ITEMS) {
      taskCache.delete(taskCache.keys().next().value);
    }
  }
  return cachedTask.task;
}
// src/lib/makeRequestOptions.ts
var HF_INFERENCE_API_BASE_URL = "https://api-inference.huggingface.co";
var tasks = null;
async function makeRequestOptions(args, options) {
  const {
    accessToken,
    endpointUrl,
    ...otherArgs
  } = args;
  let {
    model
  } = args;
  const {
    forceTask: task,
    includeCredentials,
    taskHint,
    wait_for_model,
    use_cache,
    dont_load_model,
    chatCompletion: chatCompletion2
  } = options ?? {};
  const headers = {};
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }
  if (!model && !tasks && taskHint) {
    const res = await fetch(`${HF_HUB_URL}/api/tasks`);
    if (res.ok) {
      tasks = await res.json();
    }
  }
  if (!model && tasks && taskHint) {
    const taskInfo = tasks[taskHint];
    if (taskInfo) {
      model = taskInfo.models[0].id;
    }
  }
  if (!model) {
    throw new Error("No model provided, and no default model found for this task");
  }
  const binary = "data" in args && !!args.data;
  if (!binary) {
    headers["Content-Type"] = "application/json";
  }
  if (wait_for_model) {
    headers["X-Wait-For-Model"] = "true";
  }
  if (use_cache === false) {
    headers["X-Use-Cache"] = "false";
  }
  if (dont_load_model) {
    headers["X-Load-Model"] = "0";
  }
  let url = (() => {
    if (endpointUrl && isUrl(model)) {
      throw new TypeError("Both model and endpointUrl cannot be URLs");
    }
    if (isUrl(model)) {
      console.warn("Using a model URL is deprecated, please use the `endpointUrl` parameter instead");
      return model;
    }
    if (endpointUrl) {
      return endpointUrl;
    }
    if (task) {
      return `${HF_INFERENCE_API_BASE_URL}/pipeline/${task}/${model}`;
    }
    return `${HF_INFERENCE_API_BASE_URL}/models/${model}`;
  })();
  if (chatCompletion2 && !url.endsWith("/chat/completions")) {
    url += "/v1/chat/completions";
  }
  let credentials;
  if (typeof includeCredentials === "string") {
    credentials = includeCredentials;
  } else if (includeCredentials === true) {
    credentials = "include";
  }
  const info = {
    headers,
    method: "POST",
    body: binary ? args.data : JSON.stringify({
      ...(otherArgs.model && isUrl(otherArgs.model) ? omit(otherArgs, "model") : otherArgs)
    }),
    ...(credentials && {
      credentials
    }),
    signal: options?.signal
  };
  return {
    url,
    info
  };
}
// src/tasks/custom/request.ts
async function request(args, options) {
  const {
    url,
    info
  } = await makeRequestOptions(args, options);
  const response = await (options?.fetch ?? fetch)(url, info);
  if (options?.retry_on_error !== false && response.status === 503 && !options?.wait_for_model) {
    return request(args, {
      ...options,
      wait_for_model: true
    });
  }
  if (!response.ok) {
    if (response.headers.get("Content-Type")?.startsWith("application/json")) {
      const output = await response.json();
      if ([400, 422, 404, 500].includes(response.status) && options?.chatCompletion) {
        throw new Error(`Server ${args.model} does not seem to support chat completion. Error: ${output.error}`);
      }
      if (output.error) {
        throw new Error(output.error);
      }
    }
    throw new Error("An error occurred while fetching the blob");
  }
  if (response.headers.get("Content-Type")?.startsWith("application/json")) {
    return await response.json();
  }
  return await response.blob();
}
// src/vendor/fetch-event-source/parse.ts
function getLines(onLine) {
  let buffer;
  let position;
  let fieldLength;
  let discardTrailingNewline = false;
  return function onChunk(arr) {
    if (buffer === void 0) {
      buffer = arr;
      position = 0;
      fieldLength = -1;
    } else {
      buffer = concat(buffer, arr);
    }
    const bufLength = buffer.length;
    let lineStart = 0;
    while (position < bufLength) {
      if (discardTrailingNewline) {
        if (buffer[position] === 10 /* NewLine */) {
          lineStart = ++position;
        }
        discardTrailingNewline = false;
      }
      let lineEnd = -1;
      for (; position < bufLength && lineEnd === -1; ++position) {
        switch (buffer[position]) {
          case 58 /* Colon */:
            if (fieldLength === -1) {
              fieldLength = position - lineStart;
            }
            break;
          case 13 /* CarriageReturn */:
            discardTrailingNewline = true;
          case 10 /* NewLine */:
            lineEnd = position;
            break;
        }
      }
      if (lineEnd === -1) {
        break;
      }
      onLine(buffer.subarray(lineStart, lineEnd), fieldLength);
      lineStart = position;
      fieldLength = -1;
    }
    if (lineStart === bufLength) {
      buffer = void 0;
    } else if (lineStart !== 0) {
      buffer = buffer.subarray(lineStart);
      position -= lineStart;
    }
  };
}
function getMessages(onId, onRetry, onMessage) {
  let message = newMessage();
  const decoder = new TextDecoder();
  return function onLine(line, fieldLength) {
    if (line.length === 0) {
      onMessage?.(message);
      message = newMessage();
    } else if (fieldLength > 0) {
      const field = decoder.decode(line.subarray(0, fieldLength));
      const valueOffset = fieldLength + (line[fieldLength + 1] === 32 /* Space */ ? 2 : 1);
      const value = decoder.decode(line.subarray(valueOffset));
      switch (field) {
        case "data":
          message.data = message.data ? message.data + "\n" + value : value;
          break;
        case "event":
          message.event = value;
          break;
        case "id":
          onId(message.id = value);
          break;
        case "retry":
          const retry = parseInt(value, 10);
          if (!isNaN(retry)) {
            onRetry(message.retry = retry);
          }
          break;
      }
    }
  };
}
function concat(a, b) {
  const res = new Uint8Array(a.length + b.length);
  res.set(a);
  res.set(b, a.length);
  return res;
}
function newMessage() {
  return {
    data: "",
    event: "",
    id: "",
    retry: void 0
  };
}
// src/tasks/custom/streamingRequest.ts
async function* streamingRequest(args, options) {
  const {
    url,
    info
  } = await makeRequestOptions({
    ...args,
    stream: true
  }, options);
  const response = await (options?.fetch ?? fetch)(url, info);
  if (options?.retry_on_error !== false && response.status === 503 && !options?.wait_for_model) {
    return yield* streamingRequest(args, {
      ...options,
      wait_for_model: true
    });
  }
  if (!response.ok) {
    if (response.headers.get("Content-Type")?.startsWith("application/json")) {
      const output = await response.json();
      if ([400, 422, 404, 500].includes(response.status) && options?.chatCompletion) {
        throw new Error(`Server ${args.model} does not seem to support chat completion. Error: ${output.error}`);
      }
      if (output.error) {
        throw new Error(output.error);
      }
    }
    throw new Error(`Server response contains error: ${response.status}`);
  }
  if (!response.headers.get("content-type")?.startsWith("text/event-stream")) {
    throw new Error(`Server does not support event stream content type, it returned ` + response.headers.get("content-type"));
  }
  if (!response.body) {
    return;
  }
  const reader = response.body.getReader();
  let events = [];
  const onEvent = event => {
    events.push(event);
  };
  const onChunk = getLines(getMessages(() => {}, () => {}, onEvent));
  try {
    while (true) {
      const {
        done,
        value
      } = await reader.read();
      if (done) return;
      onChunk(value);
      for (const event of events) {
        if (event.data.length > 0) {
          if (event.data === "[DONE]") {
            return;
          }
          const data = JSON.parse(event.data);
          if (typeof data === "object" && data !== null && "error" in data) {
            throw new Error(data.error);
          }
          yield data;
        }
      }
      events = [];
    }
  } finally {
    reader.releaseLock();
  }
}
// src/lib/InferenceOutputError.ts
var InferenceOutputError = class extends TypeError {
  constructor(message) {
    super(`Invalid inference output: ${message}. Use the 'request' method with the same parameters to do a custom call with no type checking.`);
    this.name = "InferenceOutputError";
  }
};
// src/tasks/audio/audioClassification.ts
async function audioClassification(args, options) {
  const res = await request(args, {
    ...options,
    taskHint: "audio-classification"
  });
  const isValidOutput = Array.isArray(res) && res.every(x => typeof x.label === "string" && typeof x.score === "number");
  if (!isValidOutput) {
    throw new InferenceOutputError("Expected Array<{label: string, score: number}>");
  }
  return res;
}
// src/tasks/audio/automaticSpeechRecognition.ts
async function automaticSpeechRecognition(args, options) {
  const res = await request(args, {
    ...options,
    taskHint: "automatic-speech-recognition"
  });
  const isValidOutput = typeof res?.text === "string";
  if (!isValidOutput) {
    throw new InferenceOutputError("Expected {text: string}");
  }
  return res;
}
// src/tasks/audio/textToSpeech.ts
async function textToSpeech(args, options) {
  const res = await request(args, {
    ...options,
    taskHint: "text-to-speech"
  });
  const isValidOutput = res && res instanceof Blob;
  if (!isValidOutput) {
    throw new InferenceOutputError("Expected Blob");
  }
  return res;
}
// src/tasks/audio/audioToAudio.ts
async function audioToAudio(args, options) {
  const res = await request(args, {
    ...options,
    taskHint: "audio-to-audio"
  });
  const isValidOutput = Array.isArray(res) && res.every(x => typeof x.label === "string" && typeof x.blob === "string" && typeof x["content-type"] === "string");
  if (!isValidOutput) {
    throw new InferenceOutputError("Expected Array<{label: string, blob: string, content-type: string}>");
  }
  return res;
}
// src/tasks/cv/imageClassification.ts
async function imageClassification(args, options) {
  const res = await request(args, {
    ...options,
    taskHint: "image-classification"
  });
  const isValidOutput = Array.isArray(res) && res.every(x => typeof x.label === "string" && typeof x.score === "number");
  if (!isValidOutput) {
    throw new InferenceOutputError("Expected Array<{label: string, score: number}>");
  }
  return res;
}
// src/tasks/cv/imageSegmentation.ts
async function imageSegmentation(args, options) {
  const res = await request(args, {
    ...options,
    taskHint: "image-segmentation"
  });
  const isValidOutput = Array.isArray(res) && res.every(x => typeof x.label === "string" && typeof x.mask === "string" && typeof x.score === "number");
  if (!isValidOutput) {
    throw new InferenceOutputError("Expected Array<{label: string, mask: string, score: number}>");
  }
  return res;
}
// src/tasks/cv/imageToText.ts
async function imageToText(args, options) {
  const res = (await request(args, {
    ...options,
    taskHint: "image-to-text"
  }))?.[0];
  if (typeof res?.generated_text !== "string") {
    throw new InferenceOutputError("Expected {generated_text: string}");
  }
  return res;
}
// src/tasks/cv/objectDetection.ts
async function objectDetection(args, options) {
  const res = await request(args, {
    ...options,
    taskHint: "object-detection"
  });
  const isValidOutput = Array.isArray(res) && res.every(x => typeof x.label === "string" && typeof x.score === "number" && typeof x.box.xmin === "number" && typeof x.box.ymin === "number" && typeof x.box.xmax === "number" && typeof x.box.ymax === "number");
  if (!isValidOutput) {
    throw new InferenceOutputError("Expected Array<{label:string; score:number; box:{xmin:number; ymin:number; xmax:number; ymax:number}}>");
  }
  return res;
}
// src/tasks/cv/textToImage.ts
async function textToImage(args, options) {
  const res = await request(args, {
    ...options,
    taskHint: "text-to-image"
  });
  const isValidOutput = res && res instanceof Blob;
  if (!isValidOutput) {
    throw new InferenceOutputError("Expected Blob");
  }
  return res;
}
// src/utils/base64FromBytes.ts
function base64FromBytes(arr) {
  if (globalThis.Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin = [];
    arr.forEach(byte => {
      bin.push(String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
}
// src/tasks/cv/imageToImage.ts
async function imageToImage(args, options) {
  let reqArgs;
  if (!args.parameters) {
    reqArgs = {
      accessToken: args.accessToken,
      model: args.model,
      data: args.inputs
    };
  } else {
    reqArgs = {
      ...args,
      inputs: base64FromBytes(new Uint8Array(args.inputs instanceof ArrayBuffer ? args.inputs : await args.inputs.arrayBuffer()))
    };
  }
  const res = await request(reqArgs, {
    ...options,
    taskHint: "image-to-image"
  });
  const isValidOutput = res && res instanceof Blob;
  if (!isValidOutput) {
    throw new InferenceOutputError("Expected Blob");
  }
  return res;
}
// src/tasks/cv/zeroShotImageClassification.ts
async function zeroShotImageClassification(args, options) {
  const reqArgs = {
    ...args,
    inputs: {
      image: base64FromBytes(new Uint8Array(args.inputs.image instanceof ArrayBuffer ? args.inputs.image : await args.inputs.image.arrayBuffer()))
    }
  };
  const res = await request(reqArgs, {
    ...options,
    taskHint: "zero-shot-image-classification"
  });
  const isValidOutput = Array.isArray(res) && res.every(x => typeof x.label === "string" && typeof x.score === "number");
  if (!isValidOutput) {
    throw new InferenceOutputError("Expected Array<{label: string, score: number}>");
  }
  return res;
}
// src/tasks/nlp/featureExtraction.ts
async function featureExtraction(args, options) {
  const defaultTask = args.model ? await getDefaultTask(args.model, args.accessToken, options) : void 0;
  const res = await request(args, {
    ...options,
    taskHint: "feature-extraction",
    ...(defaultTask === "sentence-similarity" && {
      forceTask: "feature-extraction"
    })
  });
  let isValidOutput = true;
  const isNumArrayRec = function (arr, maxDepth) {
    let curDepth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    if (curDepth > maxDepth) return false;
    if (arr.every(x => Array.isArray(x))) {
      return arr.every(x => isNumArrayRec(x, maxDepth, curDepth + 1));
    } else {
      return arr.every(x => typeof x === "number");
    }
  };
  isValidOutput = Array.isArray(res) && isNumArrayRec(res, 3, 0);
  if (!isValidOutput) {
    throw new InferenceOutputError("Expected Array<number[][][] | number[][] | number[] | number>");
  }
  return res;
}
// src/tasks/nlp/fillMask.ts
async function fillMask(args, options) {
  const res = await request(args, {
    ...options,
    taskHint: "fill-mask"
  });
  const isValidOutput = Array.isArray(res) && res.every(x => typeof x.score === "number" && typeof x.sequence === "string" && typeof x.token === "number" && typeof x.token_str === "string");
  if (!isValidOutput) {
    throw new InferenceOutputError("Expected Array<{score: number, sequence: string, token: number, token_str: string}>");
  }
  return res;
}
// src/tasks/nlp/questionAnswering.ts
async function questionAnswering(args, options) {
  const res = await request(args, {
    ...options,
    taskHint: "question-answering"
  });
  const isValidOutput = typeof res === "object" && !!res && typeof res.answer === "string" && typeof res.end === "number" && typeof res.score === "number" && typeof res.start === "number";
  if (!isValidOutput) {
    throw new InferenceOutputError("Expected {answer: string, end: number, score: number, start: number}");
  }
  return res;
}
// src/tasks/nlp/sentenceSimilarity.ts
async function sentenceSimilarity(args, options) {
  const defaultTask = args.model ? await getDefaultTask(args.model, args.accessToken, options) : void 0;
  const res = await request(args, {
    ...options,
    taskHint: "sentence-similarity",
    ...(defaultTask === "feature-extraction" && {
      forceTask: "sentence-similarity"
    })
  });
  const isValidOutput = Array.isArray(res) && res.every(x => typeof x === "number");
  if (!isValidOutput) {
    throw new InferenceOutputError("Expected number[]");
  }
  return res;
}
// src/tasks/nlp/summarization.ts
async function summarization(args, options) {
  const res = await request(args, {
    ...options,
    taskHint: "summarization"
  });
  const isValidOutput = Array.isArray(res) && res.every(x => typeof x?.summary_text === "string");
  if (!isValidOutput) {
    throw new InferenceOutputError("Expected Array<{summary_text: string}>");
  }
  return res?.[0];
}
// src/tasks/nlp/tableQuestionAnswering.ts
async function tableQuestionAnswering(args, options) {
  const res = await request(args, {
    ...options,
    taskHint: "table-question-answering"
  });
  const isValidOutput = typeof res?.aggregator === "string" && typeof res.answer === "string" && Array.isArray(res.cells) && res.cells.every(x => typeof x === "string") && Array.isArray(res.coordinates) && res.coordinates.every(coord => Array.isArray(coord) && coord.every(x => typeof x === "number"));
  if (!isValidOutput) {
    throw new InferenceOutputError("Expected {aggregator: string, answer: string, cells: string[], coordinates: number[][]}");
  }
  return res;
}
// src/tasks/nlp/textClassification.ts
async function textClassification(args, options) {
  const res = (await request(args, {
    ...options,
    taskHint: "text-classification"
  }))?.[0];
  const isValidOutput = Array.isArray(res) && res.every(x => typeof x?.label === "string" && typeof x.score === "number");
  if (!isValidOutput) {
    throw new InferenceOutputError("Expected Array<{label: string, score: number}>");
  }
  return res;
}
// src/utils/toArray.ts
function toArray(obj) {
  if (Array.isArray(obj)) {
    return obj;
  }
  return [obj];
}
// src/tasks/nlp/textGeneration.ts
async function textGeneration(args, options) {
  const res = toArray(await request(args, {
    ...options,
    taskHint: "text-generation"
  }));
  const isValidOutput = Array.isArray(res) && res.every(x => typeof x?.generated_text === "string");
  if (!isValidOutput) {
    throw new InferenceOutputError("Expected Array<{generated_text: string}>");
  }
  return res?.[0];
}
// src/tasks/nlp/textGenerationStream.ts
async function* textGenerationStream(args, options) {
  yield* streamingRequest(args, {
    ...options,
    taskHint: "text-generation"
  });
}
// src/tasks/nlp/tokenClassification.ts
async function tokenClassification(args, options) {
  const res = toArray(await request(args, {
    ...options,
    taskHint: "token-classification"
  }));
  const isValidOutput = Array.isArray(res) && res.every(x => typeof x.end === "number" && typeof x.entity_group === "string" && typeof x.score === "number" && typeof x.start === "number" && typeof x.word === "string");
  if (!isValidOutput) {
    throw new InferenceOutputError("Expected Array<{end: number, entity_group: string, score: number, start: number, word: string}>");
  }
  return res;
}
// src/tasks/nlp/translation.ts
async function translation(args, options) {
  const res = await request(args, {
    ...options,
    taskHint: "translation"
  });
  const isValidOutput = Array.isArray(res) && res.every(x => typeof x?.translation_text === "string");
  if (!isValidOutput) {
    throw new InferenceOutputError("Expected type Array<{translation_text: string}>");
  }
  return res?.length === 1 ? res?.[0] : res;
}
// src/tasks/nlp/zeroShotClassification.ts
async function zeroShotClassification(args, options) {
  const res = toArray(await request(args, {
    ...options,
    taskHint: "zero-shot-classification"
  }));
  const isValidOutput = Array.isArray(res) && res.every(x => Array.isArray(x.labels) && x.labels.every(_label => typeof _label === "string") && Array.isArray(x.scores) && x.scores.every(_score => typeof _score === "number") && typeof x.sequence === "string");
  if (!isValidOutput) {
    throw new InferenceOutputError("Expected Array<{labels: string[], scores: number[], sequence: string}>");
  }
  return res;
}
// src/tasks/nlp/chatCompletion.ts
async function chatCompletion(args, options) {
  const res = await request(args, {
    ...options,
    taskHint: "text-generation",
    chatCompletion: true
  });
  const isValidOutput = typeof res === "object" && Array.isArray(res?.choices) && typeof res?.created === "number" && typeof res?.id === "string" && typeof res?.model === "string" && typeof res?.system_fingerprint === "string" && typeof res?.usage === "object";
  if (!isValidOutput) {
    throw new InferenceOutputError("Expected ChatCompletionOutput");
  }
  return res;
}
// src/tasks/nlp/chatCompletionStream.ts
async function* chatCompletionStream(args, options) {
  yield* streamingRequest(args, {
    ...options,
    taskHint: "text-generation",
    chatCompletion: true
  });
}
// src/tasks/multimodal/documentQuestionAnswering.ts
async function documentQuestionAnswering(args, options) {
  const reqArgs = {
    ...args,
    inputs: {
      question: args.inputs.question,
      // convert Blob or ArrayBuffer to base64
      image: base64FromBytes(new Uint8Array(args.inputs.image instanceof ArrayBuffer ? args.inputs.image : await args.inputs.image.arrayBuffer()))
    }
  };
  const res = toArray(await request(reqArgs, {
    ...options,
    taskHint: "document-question-answering"
  }))?.[0];
  const isValidOutput = typeof res?.answer === "string" && (typeof res.end === "number" || typeof res.end === "undefined") && (typeof res.score === "number" || typeof res.score === "undefined") && (typeof res.start === "number" || typeof res.start === "undefined");
  if (!isValidOutput) {
    throw new InferenceOutputError("Expected Array<{answer: string, end?: number, score?: number, start?: number}>");
  }
  return res;
}
// src/tasks/multimodal/visualQuestionAnswering.ts
async function visualQuestionAnswering(args, options) {
  const reqArgs = {
    ...args,
    inputs: {
      question: args.inputs.question,
      // convert Blob or ArrayBuffer to base64
      image: base64FromBytes(new Uint8Array(args.inputs.image instanceof ArrayBuffer ? args.inputs.image : await args.inputs.image.arrayBuffer()))
    }
  };
  const res = (await request(reqArgs, {
    ...options,
    taskHint: "visual-question-answering"
  }))?.[0];
  const isValidOutput = typeof res?.answer === "string" && typeof res.score === "number";
  if (!isValidOutput) {
    throw new InferenceOutputError("Expected Array<{answer: string, score: number}>");
  }
  return res;
}
// src/tasks/tabular/tabularRegression.ts
async function tabularRegression(args, options) {
  const res = await request(args, {
    ...options,
    taskHint: "tabular-regression"
  });
  const isValidOutput = Array.isArray(res) && res.every(x => typeof x === "number");
  if (!isValidOutput) {
    throw new InferenceOutputError("Expected number[]");
  }
  return res;
}
// src/tasks/tabular/tabularClassification.ts
async function tabularClassification(args, options) {
  const res = await request(args, {
    ...options,
    taskHint: "tabular-classification"
  });
  const isValidOutput = Array.isArray(res) && res.every(x => typeof x === "number");
  if (!isValidOutput) {
    throw new InferenceOutputError("Expected number[]");
  }
  return res;
}
// src/HfInference.ts
var HfInference = class {
  accessToken;
  defaultOptions;
  constructor() {
    let accessToken = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    let defaultOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    this.accessToken = accessToken;
    this.defaultOptions = defaultOptions;
    for (const [name, fn] of Object.entries(tasks_exports)) {
      Object.defineProperty(this, name, {
        enumerable: false,
        value: (params, options) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fn({
          ...params,
          accessToken
        }, {
          ...defaultOptions,
          ...options
        })
      });
    }
  }
  /**
   * Returns copy of HfInference tied to a specified endpoint.
   */
  endpoint(endpointUrl) {
    return new HfInferenceEndpoint(endpointUrl, this.accessToken, this.defaultOptions);
  }
};
var HfInferenceEndpoint = class {
  constructor(endpointUrl) {
    let accessToken = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    let defaultOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    accessToken;
    defaultOptions;
    for (const [name, fn] of Object.entries(tasks_exports)) {
      Object.defineProperty(this, name, {
        enumerable: false,
        value: (params, options) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fn({
          ...params,
          accessToken,
          endpointUrl
        }, {
          ...defaultOptions,
          ...options
        })
      });
    }
  }
};


/***/ }),

/***/ "./src/background/background.ts":
/*!**************************************!*\
  !*** ./src/background/background.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common */ "./src/background/common.ts");
/* harmony import */ var _modules_overlay_background__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/overlay/background */ "./src/modules/overlay/background.ts");
/* harmony import */ var _modules_huggingface_background__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/huggingface/background */ "./src/modules/huggingface/background.ts");



// import '../modules/network/background';

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
  response(sender.tab?.id);
});
// onRuntimeMessage('execScript', ([script, VO], sender, response) => {
//     evalScriptInTab(sender.tab?.id!, script, VO);
// });

/***/ }),

/***/ "./src/modules/huggingface/background.ts":
/*!***********************************************!*\
  !*** ./src/modules/huggingface/background.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "./src/utils/index.ts");
/* harmony import */ var _huggingface_inference__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @huggingface/inference */ "./node_modules/@huggingface/inference/dist/index.js");


const HF_TOKEN = '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';
const inference = new _huggingface_inference__WEBPACK_IMPORTED_MODULE_1__.HfInference(HF_TOKEN);
let lastResult = undefined;
(0,_utils__WEBPACK_IMPORTED_MODULE_0__.onRuntimeMessage)('queryHuggingFace', async (data, sender, response) => {
  const [api, params] = data;
  console.log(`send HuggingFace: ${api}`);
  const result = await inference[api](params);
  lastResult = {
    api,
    params,
    result
  };
  response(lastResult);
});
(0,_utils__WEBPACK_IMPORTED_MODULE_0__.onRuntimeMessage)('getLastHuggingFaceData', async (data, sender, response) => {
  response(lastResult);
});
console.log('HuggingFace module loaded');

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
  let [currentTabId, captureData] = data;
  // console.log('setOverlayCapture', currentTabId);
  // 空的base64是 data:,
  if (!captureData?.base64 || captureData.base64.length < 10) {
    overlayMap.delete(currentTabId);
  } else {
    overlayMap.set(currentTabId, captureData);
    response();
  }
  // console.log('sendTabMessage updateOverlayCapture', currentTabId, overlayMap.get(currentTabId));
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
/* harmony export */   "evalScriptInTab": () => (/* binding */ evalScriptInTab),
/* harmony export */   "getAllTabs": () => (/* binding */ getAllTabs),
/* harmony export */   "getCurrentTab": () => (/* binding */ getCurrentTab),
/* harmony export */   "getSelected": () => (/* binding */ getSelected),
/* harmony export */   "getTab": () => (/* binding */ getTab),
/* harmony export */   "popupMaxHeight": () => (/* binding */ popupMaxHeight),
/* harmony export */   "popupMaxWidth": () => (/* binding */ popupMaxWidth),
/* harmony export */   "popupMinWidth": () => (/* binding */ popupMinWidth),
/* harmony export */   "setBodySize": () => (/* binding */ setBodySize)
/* harmony export */ });
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools */ "./src/utils/tools.ts");

// tabs =====================================================
async function getSelected() {
  return new Promise(res => {
    // chrome.tabs.getSelected(function (tab) {
    //     res(tab);
    // });
    chrome.tabs.query({
      currentWindow: true,
      active: true
    }, function (tabs) {
      res(tabs[0]);
    });
  });
}
async function getCurrentTab() {
  // return chrome.tabs.getCurrent();
  return new Promise(res => {
    // chrome.tabs.getSelected(function (tab) {
    //     res(tab);
    // });
    chrome.tabs.query({
      currentWindow: true,
      active: true
    }, function (tabs) {
      res(tabs[0]);
    });
  });
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
}
// message =====================================================
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
  (0,_tools__WEBPACK_IMPORTED_MODULE_0__.$)('#main').style.width = `${maxWidth ? popupMaxWidth : popupMinWidth}px`;
  if (typeof maxHeight === 'boolean') {
    (0,_tools__WEBPACK_IMPORTED_MODULE_0__.$)('#main').style.height = maxHeight ? `${popupMaxHeight}px` : '';
  }
}
// env ========================================================
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
function evalScriptInTab(tabId, script) {
  let varObj = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  const varNames = [];
  const varData = [];
  Object.entries(varObj).forEach(_ref => {
    let [name, data] = _ref;
    varNames.push(name);
    varData.push(data);
  });
  chrome.scripting.executeScript({
    target: {
      tabId
    },
    args: [script, varNames, varData],
    func: function (script) {
      let varNames = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      let varData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      console.log('eeee=====', script, varNames, varData);
      return Function(...varNames, `"use strict";${script}`)(...varData);
    }
  });
}

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
/* harmony export */   "evalScriptInTab": () => (/* reexport safe */ _chrome__WEBPACK_IMPORTED_MODULE_3__.evalScriptInTab),
/* harmony export */   "getAllTabs": () => (/* reexport safe */ _chrome__WEBPACK_IMPORTED_MODULE_3__.getAllTabs),
/* harmony export */   "getCurrentTab": () => (/* reexport safe */ _chrome__WEBPACK_IMPORTED_MODULE_3__.getCurrentTab),
/* harmony export */   "getLocalStorage": () => (/* reexport safe */ _storage__WEBPACK_IMPORTED_MODULE_2__.getLocalStorage),
/* harmony export */   "getSelected": () => (/* reexport safe */ _chrome__WEBPACK_IMPORTED_MODULE_3__.getSelected),
/* harmony export */   "getStorageExportData": () => (/* reexport safe */ _storage__WEBPACK_IMPORTED_MODULE_2__.getStorageExportData),
/* harmony export */   "getTab": () => (/* reexport safe */ _chrome__WEBPACK_IMPORTED_MODULE_3__.getTab),
/* harmony export */   "insertTemplate": () => (/* reexport safe */ _tools__WEBPACK_IMPORTED_MODULE_4__.insertTemplate),
/* harmony export */   "loadImage": () => (/* reexport safe */ _tools__WEBPACK_IMPORTED_MODULE_4__.loadImage),
/* harmony export */   "matchUrl": () => (/* reexport safe */ _tools__WEBPACK_IMPORTED_MODULE_4__.matchUrl),
/* harmony export */   "matchUrlPattern": () => (/* reexport safe */ _tools__WEBPACK_IMPORTED_MODULE_4__.matchUrlPattern),
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
    chrome.storage.local.get(name, rs => res(rs?.[name] ?? defaultValue));
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
      await handler?.onImport(importData);
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
/* harmony export */   "matchUrl": () => (/* binding */ matchUrl),
/* harmony export */   "matchUrlPattern": () => (/* binding */ matchUrlPattern),
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
    timer = setTimeout(() => fn(...args), delay);
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
}
// export async function loadScript(src: string) {
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
function toPreg(urlPattern) {
  // 这里有些特殊字符可能需要处理，例如?之类的
  return new RegExp(String.raw`^${urlPattern}`.replace(/([\?])/g, '\\$1'));
}
/**
 * url 通配符匹配使用
 */
function matchUrl(url, pattern) {
  return toPreg(pattern).test(url);
}
function matchUrlPattern(url, itemList, getUrl) {
  let match = undefined;
  itemList.map(item => getUrl(item)).forEach((urlPattern, index) => {
    // 匹配而且比之前match的更长
    if (matchUrl(url, urlPattern) && (!match || urlPattern.length > getUrl(match).length)) {
      match = itemList[index];
    }
  });
  return match;
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
/******/ 	__webpack_require__("../../../.config/yarn/global/node_modules/regenerator-runtime/runtime.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/background/background.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUMvMUJBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDM0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDcEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBOzs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBRU5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ucC1jaHJvbWUtZXh0ZW5zaW9uLy4uLy4uLy4uLy5jb25maWcveWFybi9nbG9iYWwvbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyIsIndlYnBhY2s6Ly9ucC1jaHJvbWUtZXh0ZW5zaW9uLy4vbm9kZV9tb2R1bGVzL0BodWdnaW5nZmFjZS9pbmZlcmVuY2UvZGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly9ucC1jaHJvbWUtZXh0ZW5zaW9uLy4vc3JjL2JhY2tncm91bmQvYmFja2dyb3VuZC50cyIsIndlYnBhY2s6Ly9ucC1jaHJvbWUtZXh0ZW5zaW9uLy4vc3JjL2JhY2tncm91bmQvY29tbW9uLnRzIiwid2VicGFjazovL25wLWNocm9tZS1leHRlbnNpb24vLi9zcmMvbW9kdWxlcy9odWdnaW5nZmFjZS9iYWNrZ3JvdW5kLnRzIiwid2VicGFjazovL25wLWNocm9tZS1leHRlbnNpb24vLi9zcmMvbW9kdWxlcy9vdmVybGF5L2JhY2tncm91bmQudHMiLCJ3ZWJwYWNrOi8vbnAtY2hyb21lLWV4dGVuc2lvbi8uL3NyYy91dGlscy9jaHJvbWUudHMiLCJ3ZWJwYWNrOi8vbnAtY2hyb21lLWV4dGVuc2lvbi8uL3NyYy91dGlscy9kcmFnZ2VyLnRzIiwid2VicGFjazovL25wLWNocm9tZS1leHRlbnNpb24vLi9zcmMvdXRpbHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbnAtY2hyb21lLWV4dGVuc2lvbi8uL3NyYy91dGlscy9tZXNzYWdlLnRzIiwid2VicGFjazovL25wLWNocm9tZS1leHRlbnNpb24vLi9zcmMvdXRpbHMvc3RvcmFnZS50cyIsIndlYnBhY2s6Ly9ucC1jaHJvbWUtZXh0ZW5zaW9uLy4vc3JjL3V0aWxzL3Rvb2xzLnRzIiwid2VicGFjazovL25wLWNocm9tZS1leHRlbnNpb24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbnAtY2hyb21lLWV4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbnAtY2hyb21lLWV4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25wLWNocm9tZS1leHRlbnNpb24vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9ucC1jaHJvbWUtZXh0ZW5zaW9uL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vbnAtY2hyb21lLWV4dGVuc2lvbi93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vbnAtY2hyb21lLWV4dGVuc2lvbi93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cbnZhciBydW50aW1lID0gZnVuY3Rpb24gKGV4cG9ydHMpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIE9wID0gT2JqZWN0LnByb3RvdHlwZTtcbiAgdmFyIGhhc093biA9IE9wLmhhc093blByb3BlcnR5O1xuICB2YXIgZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkgfHwgZnVuY3Rpb24gKG9iaiwga2V5LCBkZXNjKSB7XG4gICAgb2JqW2tleV0gPSBkZXNjLnZhbHVlO1xuICB9O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cbiAgdmFyICRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2wgOiB7fTtcbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcbiAgdmFyIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIjtcbiAgdmFyIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcbiAgZnVuY3Rpb24gZGVmaW5lKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIG9ialtrZXldO1xuICB9XG4gIHRyeSB7XG4gICAgLy8gSUUgOCBoYXMgYSBicm9rZW4gT2JqZWN0LmRlZmluZVByb3BlcnR5IHRoYXQgb25seSB3b3JrcyBvbiBET00gb2JqZWN0cy5cbiAgICBkZWZpbmUoe30sIFwiXCIpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBkZWZpbmUgPSBmdW5jdGlvbiAob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgICByZXR1cm4gb2JqW2tleV0gPSB2YWx1ZTtcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBJZiBvdXRlckZuIHByb3ZpZGVkIGFuZCBvdXRlckZuLnByb3RvdHlwZSBpcyBhIEdlbmVyYXRvciwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci5cbiAgICB2YXIgcHJvdG9HZW5lcmF0b3IgPSBvdXRlckZuICYmIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gb3V0ZXJGbiA6IEdlbmVyYXRvcjtcbiAgICB2YXIgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShwcm90b0dlbmVyYXRvci5wcm90b3R5cGUpO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pO1xuICAgIC8vIFRoZSAuX2ludm9rZSBtZXRob2QgdW5pZmllcyB0aGUgaW1wbGVtZW50YXRpb25zIG9mIHRoZSAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMuXG4gICAgZGVmaW5lUHJvcGVydHkoZ2VuZXJhdG9yLCBcIl9pbnZva2VcIiwge1xuICAgICAgdmFsdWU6IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dClcbiAgICB9KTtcbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG4gIGV4cG9ydHMud3JhcCA9IHdyYXA7XG4gIC8vIFRyeS9jYXRjaCBoZWxwZXIgdG8gbWluaW1pemUgZGVvcHRpbWl6YXRpb25zLiBSZXR1cm5zIGEgY29tcGxldGlvblxuICAvLyByZWNvcmQgbGlrZSBjb250ZXh0LnRyeUVudHJpZXNbaV0uY29tcGxldGlvbi4gVGhpcyBpbnRlcmZhY2UgY291bGRcbiAgLy8gaGF2ZSBiZWVuIChhbmQgd2FzIHByZXZpb3VzbHkpIGRlc2lnbmVkIHRvIHRha2UgYSBjbG9zdXJlIHRvIGJlXG4gIC8vIGludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIGJ1dCBpbiBhbGwgdGhlIGNhc2VzIHdlIGNhcmUgYWJvdXQgd2VcbiAgLy8gYWxyZWFkeSBoYXZlIGFuIGV4aXN0aW5nIG1ldGhvZCB3ZSB3YW50IHRvIGNhbGwsIHNvIHRoZXJlJ3Mgbm8gbmVlZFxuICAvLyB0byBjcmVhdGUgYSBuZXcgZnVuY3Rpb24gb2JqZWN0LiBXZSBjYW4gZXZlbiBnZXQgYXdheSB3aXRoIGFzc3VtaW5nXG4gIC8vIHRoZSBtZXRob2QgdGFrZXMgZXhhY3RseSBvbmUgYXJndW1lbnQsIHNpbmNlIHRoYXQgaGFwcGVucyB0byBiZSB0cnVlXG4gIC8vIGluIGV2ZXJ5IGNhc2UsIHNvIHdlIGRvbid0IGhhdmUgdG8gdG91Y2ggdGhlIGFyZ3VtZW50cyBvYmplY3QuIFRoZVxuICAvLyBvbmx5IGFkZGl0aW9uYWwgYWxsb2NhdGlvbiByZXF1aXJlZCBpcyB0aGUgY29tcGxldGlvbiByZWNvcmQsIHdoaWNoXG4gIC8vIGhhcyBhIHN0YWJsZSBzaGFwZSBhbmQgc28gaG9wZWZ1bGx5IHNob3VsZCBiZSBjaGVhcCB0byBhbGxvY2F0ZS5cbiAgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IFwibm9ybWFsXCIsXG4gICAgICAgIGFyZzogZm4uY2FsbChvYmosIGFyZylcbiAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBcInRocm93XCIsXG4gICAgICAgIGFyZzogZXJyXG4gICAgICB9O1xuICAgIH1cbiAgfVxuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRTdGFydCA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkWWllbGQgPSBcInN1c3BlbmRlZFlpZWxkXCI7XG4gIHZhciBHZW5TdGF0ZUV4ZWN1dGluZyA9IFwiZXhlY3V0aW5nXCI7XG4gIHZhciBHZW5TdGF0ZUNvbXBsZXRlZCA9IFwiY29tcGxldGVkXCI7XG4gIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuICAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuICAvLyBUaGlzIGlzIGEgcG9seWZpbGwgZm9yICVJdGVyYXRvclByb3RvdHlwZSUgZm9yIGVudmlyb25tZW50cyB0aGF0XG4gIC8vIGRvbid0IG5hdGl2ZWx5IHN1cHBvcnQgaXQuXG4gIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuICBkZWZpbmUoSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pO1xuICB2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG4gIHZhciBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvICYmIGdldFByb3RvKGdldFByb3RvKHZhbHVlcyhbXSkpKTtcbiAgaWYgKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPcCAmJiBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpKSB7XG4gICAgLy8gVGhpcyBlbnZpcm9ubWVudCBoYXMgYSBuYXRpdmUgJUl0ZXJhdG9yUHJvdG90eXBlJTsgdXNlIGl0IGluc3RlYWRcbiAgICAvLyBvZiB0aGUgcG9seWZpbGwuXG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxuICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPSBHZW5lcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSk7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICBkZWZpbmVQcm9wZXJ0eShHcCwgXCJjb25zdHJ1Y3RvclwiLCB7XG4gICAgdmFsdWU6IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KTtcbiAgZGVmaW5lUHJvcGVydHkoR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsIFwiY29uc3RydWN0b3JcIiwge1xuICAgIHZhbHVlOiBHZW5lcmF0b3JGdW5jdGlvbixcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfSk7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gZGVmaW5lKEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JGdW5jdGlvblwiKTtcbiAgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcbiAgICAgIGRlZmluZShwcm90b3R5cGUsIG1ldGhvZCwgZnVuY3Rpb24gKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uIChnZW5GdW4pIHtcbiAgICB2YXIgY3RvciA9IHR5cGVvZiBnZW5GdW4gPT09IFwiZnVuY3Rpb25cIiAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIGN0b3IgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fFxuICAgIC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAvLyBkbyBpcyB0byBjaGVjayBpdHMgLm5hbWUgcHJvcGVydHkuXG4gICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiIDogZmFsc2U7XG4gIH07XG4gIGV4cG9ydHMubWFyayA9IGZ1bmN0aW9uIChnZW5GdW4pIHtcbiAgICBpZiAoT2JqZWN0LnNldFByb3RvdHlwZU9mKSB7XG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICAgIGRlZmluZShnZW5GdW4sIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvckZ1bmN0aW9uXCIpO1xuICAgIH1cbiAgICBnZW5GdW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcCk7XG4gICAgcmV0dXJuIGdlbkZ1bjtcbiAgfTtcbiAgLy8gV2l0aGluIHRoZSBib2R5IG9mIGFueSBhc3luYyBmdW5jdGlvbiwgYGF3YWl0IHhgIGlzIHRyYW5zZm9ybWVkIHRvXG4gIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gIC8vIGBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpYCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC5cbiAgZXhwb3J0cy5hd3JhcCA9IGZ1bmN0aW9uIChhcmcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgX19hd2FpdDogYXJnXG4gICAgfTtcbiAgfTtcbiAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcihnZW5lcmF0b3IsIFByb21pc2VJbXBsKSB7XG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpO1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmc7XG4gICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgaW52b2tlKFwidGhyb3dcIiwgZXJyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uICh1bndyYXBwZWQpIHtcbiAgICAgICAgICAvLyBXaGVuIGEgeWllbGRlZCBQcm9taXNlIGlzIHJlc29sdmVkLCBpdHMgZmluYWwgdmFsdWUgYmVjb21lc1xuICAgICAgICAgIC8vIHRoZSAudmFsdWUgb2YgdGhlIFByb21pc2U8e3ZhbHVlLGRvbmV9PiByZXN1bHQgZm9yIHRoZVxuICAgICAgICAgIC8vIGN1cnJlbnQgaXRlcmF0aW9uLlxuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZDtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgIC8vIElmIGEgcmVqZWN0ZWQgUHJvbWlzZSB3YXMgeWllbGRlZCwgdGhyb3cgdGhlIHJlamVjdGlvbiBiYWNrXG4gICAgICAgICAgLy8gaW50byB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIHNvIGl0IGNhbiBiZSBoYW5kbGVkIHRoZXJlLlxuICAgICAgICAgIHJldHVybiBpbnZva2UoXCJ0aHJvd1wiLCBlcnJvciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZUltcGwoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcHJldmlvdXNQcm9taXNlID1cbiAgICAgIC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgIC8vIGFsbCBwcmV2aW91cyBQcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQgYmVmb3JlIGNhbGxpbmcgaW52b2tlLFxuICAgICAgLy8gc28gdGhhdCByZXN1bHRzIGFyZSBhbHdheXMgZGVsaXZlcmVkIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBJZlxuICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgIC8vIGNhbGwgaW52b2tlIGltbWVkaWF0ZWx5LCB3aXRob3V0IHdhaXRpbmcgb24gYSBjYWxsYmFjayB0byBmaXJlLFxuICAgICAgLy8gc28gdGhhdCB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhcyB0aGUgb3Bwb3J0dW5pdHkgdG8gZG9cbiAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgIC8vIGlzIHdoeSB0aGUgUHJvbWlzZSBjb25zdHJ1Y3RvciBzeW5jaHJvbm91c2x5IGludm9rZXMgaXRzXG4gICAgICAvLyBleGVjdXRvciBjYWxsYmFjaywgYW5kIHdoeSBhc3luYyBmdW5jdGlvbnMgc3luY2hyb25vdXNseVxuICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBhc3luYyBnZW5lcmF0b3JzLCBpdCBpcyBlc3BlY2lhbGx5XG4gICAgICAvLyBpbXBvcnRhbnQgdG8gZ2V0IHRoaXMgcmlnaHQsIGV2ZW4gdGhvdWdoIGl0IHJlcXVpcmVzIGNhcmUuXG4gICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyxcbiAgICAgIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5IGxhdGVyXG4gICAgICAvLyBpbnZvY2F0aW9ucyBvZiB0aGUgaXRlcmF0b3IuXG4gICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZykgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgIH1cbiAgICAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuICAgIGRlZmluZVByb3BlcnR5KHRoaXMsIFwiX2ludm9rZVwiLCB7XG4gICAgICB2YWx1ZTogZW5xdWV1ZVxuICAgIH0pO1xuICB9XG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSk7XG4gIGRlZmluZShBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSwgYXN5bmNJdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KTtcbiAgZXhwb3J0cy5Bc3luY0l0ZXJhdG9yID0gQXN5bmNJdGVyYXRvcjtcbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIGV4cG9ydHMuYXN5bmMgPSBmdW5jdGlvbiAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QsIFByb21pc2VJbXBsKSB7XG4gICAgaWYgKFByb21pc2VJbXBsID09PSB2b2lkIDApIFByb21pc2VJbXBsID0gUHJvbWlzZTtcbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpLCBQcm9taXNlSW1wbCk7XG4gICAgcmV0dXJuIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKSA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLlxuICAgIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICB9KTtcbiAgfTtcbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcbiAgICByZXR1cm4gZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlRXhlY3V0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICB9XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgfVxuICAgICAgICAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgIGNvbnRleHQuYXJnID0gYXJnO1xuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgdmFyIGRlbGVnYXRlUmVzdWx0ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG4gICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlUmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgLy8gU2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gY29udGV4dC5hcmc7XG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydCkge1xuICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAgIHRocm93IGNvbnRleHQuYXJnO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgfVxuICAgICAgICBzdGF0ZSA9IEdlblN0YXRlRXhlY3V0aW5nO1xuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmUgPyBHZW5TdGF0ZUNvbXBsZXRlZCA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG4gICAgICAgICAgaWYgKHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgIC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cbiAgLy8gQ2FsbCBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF0oY29udGV4dC5hcmcpIGFuZCBoYW5kbGUgdGhlXG4gIC8vIHJlc3VsdCwgZWl0aGVyIGJ5IHJldHVybmluZyBhIHsgdmFsdWUsIGRvbmUgfSByZXN1bHQgZnJvbSB0aGVcbiAgLy8gZGVsZWdhdGUgaXRlcmF0b3IsIG9yIGJ5IG1vZGlmeWluZyBjb250ZXh0Lm1ldGhvZCBhbmQgY29udGV4dC5hcmcsXG4gIC8vIHNldHRpbmcgY29udGV4dC5kZWxlZ2F0ZSB0byBudWxsLCBhbmQgcmV0dXJuaW5nIHRoZSBDb250aW51ZVNlbnRpbmVsLlxuICBmdW5jdGlvbiBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIG1ldGhvZE5hbWUgPSBjb250ZXh0Lm1ldGhvZDtcbiAgICB2YXIgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbbWV0aG9kTmFtZV07XG4gICAgaWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBBIC50aHJvdyBvciAucmV0dXJuIHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyAudGhyb3dcbiAgICAgIC8vIG1ldGhvZCwgb3IgYSBtaXNzaW5nIC5uZXh0IG1laHRvZCwgYWx3YXlzIHRlcm1pbmF0ZSB0aGVcbiAgICAgIC8vIHlpZWxkKiBsb29wLlxuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICAvLyBOb3RlOiBbXCJyZXR1cm5cIl0gbXVzdCBiZSB1c2VkIGZvciBFUzMgcGFyc2luZyBjb21wYXRpYmlsaXR5LlxuICAgICAgaWYgKG1ldGhvZE5hbWUgPT09IFwidGhyb3dcIiAmJiBkZWxlZ2F0ZS5pdGVyYXRvcltcInJldHVyblwiXSkge1xuICAgICAgICAvLyBJZiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIGEgcmV0dXJuIG1ldGhvZCwgZ2l2ZSBpdCBhXG4gICAgICAgIC8vIGNoYW5jZSB0byBjbGVhbiB1cC5cbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG4gICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgLy8gSWYgbWF5YmVJbnZva2VEZWxlZ2F0ZShjb250ZXh0KSBjaGFuZ2VkIGNvbnRleHQubWV0aG9kIGZyb21cbiAgICAgICAgICAvLyBcInJldHVyblwiIHRvIFwidGhyb3dcIiwgbGV0IHRoYXQgb3ZlcnJpZGUgdGhlIFR5cGVFcnJvciBiZWxvdy5cbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1ldGhvZE5hbWUgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIlRoZSBpdGVyYXRvciBkb2VzIG5vdCBwcm92aWRlIGEgJ1wiICsgbWV0aG9kTmFtZSArIFwiJyBtZXRob2RcIik7XG4gICAgICB9XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKG1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGNvbnRleHQuYXJnKTtcbiAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG4gICAgaWYgKCFpbmZvKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgLy8gQXNzaWduIHRoZSByZXN1bHQgb2YgdGhlIGZpbmlzaGVkIGRlbGVnYXRlIHRvIHRoZSB0ZW1wb3JhcnlcbiAgICAgIC8vIHZhcmlhYmxlIHNwZWNpZmllZCBieSBkZWxlZ2F0ZS5yZXN1bHROYW1lIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTtcbiAgICAgIC8vIFJlc3VtZSBleGVjdXRpb24gYXQgdGhlIGRlc2lyZWQgbG9jYXRpb24gKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7XG4gICAgICAvLyBJZiBjb250ZXh0Lm1ldGhvZCB3YXMgXCJ0aHJvd1wiIGJ1dCB0aGUgZGVsZWdhdGUgaGFuZGxlZCB0aGVcbiAgICAgIC8vIGV4Y2VwdGlvbiwgbGV0IHRoZSBvdXRlciBnZW5lcmF0b3IgcHJvY2VlZCBub3JtYWxseS4gSWZcbiAgICAgIC8vIGNvbnRleHQubWV0aG9kIHdhcyBcIm5leHRcIiwgZm9yZ2V0IGNvbnRleHQuYXJnIHNpbmNlIGl0IGhhcyBiZWVuXG4gICAgICAvLyBcImNvbnN1bWVkXCIgYnkgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yLiBJZiBjb250ZXh0Lm1ldGhvZCB3YXNcbiAgICAgIC8vIFwicmV0dXJuXCIsIGFsbG93IHRoZSBvcmlnaW5hbCAucmV0dXJuIGNhbGwgdG8gY29udGludWUgaW4gdGhlXG4gICAgICAvLyBvdXRlciBnZW5lcmF0b3IuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlLXlpZWxkIHRoZSByZXN1bHQgcmV0dXJuZWQgYnkgdGhlIGRlbGVnYXRlIG1ldGhvZC5cbiAgICAgIHJldHVybiBpbmZvO1xuICAgIH1cbiAgICAvLyBUaGUgZGVsZWdhdGUgaXRlcmF0b3IgaXMgZmluaXNoZWQsIHNvIGZvcmdldCBpdCBhbmQgY29udGludWUgd2l0aFxuICAgIC8vIHRoZSBvdXRlciBnZW5lcmF0b3IuXG4gICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gIH1cbiAgLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuICBkZWZpbmUoR3AsIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvclwiKTtcbiAgLy8gQSBHZW5lcmF0b3Igc2hvdWxkIGFsd2F5cyByZXR1cm4gaXRzZWxmIGFzIHRoZSBpdGVyYXRvciBvYmplY3Qgd2hlbiB0aGVcbiAgLy8gQEBpdGVyYXRvciBmdW5jdGlvbiBpcyBjYWxsZWQgb24gaXQuIFNvbWUgYnJvd3NlcnMnIGltcGxlbWVudGF0aW9ucyBvZiB0aGVcbiAgLy8gaXRlcmF0b3IgcHJvdG90eXBlIGNoYWluIGluY29ycmVjdGx5IGltcGxlbWVudCB0aGlzLCBjYXVzaW5nIHRoZSBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0IHRvIG5vdCBiZSByZXR1cm5lZCBmcm9tIHRoaXMgY2FsbC4gVGhpcyBlbnN1cmVzIHRoYXQgZG9lc24ndCBoYXBwZW4uXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvaXNzdWVzLzI3NCBmb3IgbW9yZSBkZXRhaWxzLlxuICBkZWZpbmUoR3AsIGl0ZXJhdG9yU3ltYm9sLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pO1xuICBkZWZpbmUoR3AsIFwidG9TdHJpbmdcIiwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9KTtcbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7XG4gICAgICB0cnlMb2M6IGxvY3NbMF1cbiAgICB9O1xuICAgIGlmICgxIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXTtcbiAgICB9XG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307XG4gICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiO1xuICAgIGRlbGV0ZSByZWNvcmQuYXJnO1xuICAgIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3tcbiAgICAgIHRyeUxvYzogXCJyb290XCJcbiAgICB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuICBleHBvcnRzLmtleXMgPSBmdW5jdGlvbiAodmFsKSB7XG4gICAgdmFyIG9iamVjdCA9IE9iamVjdCh2YWwpO1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIGtleXMucmV2ZXJzZSgpO1xuICAgIC8vIFJhdGhlciB0aGFuIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCBhIG5leHQgbWV0aG9kLCB3ZSBrZWVwXG4gICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cbiAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9O1xuICB9O1xuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlLm5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICB9XG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSxcbiAgICAgICAgICBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkge1xuICAgICAgICAgICAgICAgIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXTtcbiAgICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuICAgIHJldHVybiB7XG4gICAgICBuZXh0OiBkb25lUmVzdWx0XG4gICAgfTtcbiAgfVxuICBleHBvcnRzLnZhbHVlcyA9IHZhbHVlcztcbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgIGRvbmU6IHRydWVcbiAgICB9O1xuICB9XG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuICAgIHJlc2V0OiBmdW5jdGlvbiAoc2tpcFRlbXBSZXNldCkge1xuICAgICAgdGhpcy5wcmV2ID0gMDtcbiAgICAgIHRoaXMubmV4dCA9IDA7XG4gICAgICAvLyBSZXNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG4gICAgICBpZiAoIXNraXBUZW1wUmVzZXQpIHtcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgICAgLy8gTm90IHN1cmUgYWJvdXQgdGhlIG9wdGltYWwgb3JkZXIgb2YgdGhlc2UgY29uZGl0aW9uczpcbiAgICAgICAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT09IFwidFwiICYmIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmICFpc05hTigrbmFtZS5zbGljZSgxKSkpIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBzdG9wOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuICAgICAgdmFyIHJvb3RFbnRyeSA9IHRoaXMudHJ5RW50cmllc1swXTtcbiAgICAgIHZhciByb290UmVjb3JkID0gcm9vdEVudHJ5LmNvbXBsZXRpb247XG4gICAgICBpZiAocm9vdFJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uIChleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgICAgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgfVxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG4gICAgICAgIGlmIChjYXVnaHQpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gISFjYXVnaHQ7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKTtcbiAgICAgICAgICB2YXIgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG4gICAgICAgICAgaWYgKGhhc0NhdGNoICYmIGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgYWJydXB0OiBmdW5jdGlvbiAodHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiYgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJiB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmICh0eXBlID09PSBcImJyZWFrXCIgfHwgdHlwZSA9PT0gXCJjb250aW51ZVwiKSAmJiBmaW5hbGx5RW50cnkudHJ5TG9jIDw9IGFyZyAmJiBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gdHlwZTtcbiAgICAgIHJlY29yZC5hcmcgPSBhcmc7XG4gICAgICBpZiAoZmluYWxseUVudHJ5KSB7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jO1xuICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcbiAgICBjb21wbGV0ZTogZnVuY3Rpb24gKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJlY29yZC5hcmc7XG4gICAgICB9XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fCByZWNvcmQudHlwZSA9PT0gXCJjb250aW51ZVwiKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInJldHVyblwiKSB7XG4gICAgICAgIHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIiAmJiBhZnRlckxvYykge1xuICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgIH1cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH0sXG4gICAgZmluaXNoOiBmdW5jdGlvbiAoZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24gKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBUaGUgY29udGV4dC5jYXRjaCBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCB3aXRoIGEgbG9jYXRpb25cbiAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uIChpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH07XG4gICAgICBpZiAodGhpcy5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH07XG4gIC8vIFJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGVcbiAgLy8gb3Igbm90LCByZXR1cm4gdGhlIHJ1bnRpbWUgb2JqZWN0IHNvIHRoYXQgd2UgY2FuIGRlY2xhcmUgdGhlIHZhcmlhYmxlXG4gIC8vIHJlZ2VuZXJhdG9yUnVudGltZSBpbiB0aGUgb3V0ZXIgc2NvcGUsIHdoaWNoIGFsbG93cyB0aGlzIG1vZHVsZSB0byBiZVxuICAvLyBpbmplY3RlZCBlYXNpbHkgYnkgYGJpbi9yZWdlbmVyYXRvciAtLWluY2x1ZGUtcnVudGltZSBzY3JpcHQuanNgLlxuICByZXR1cm4gZXhwb3J0cztcbn0oXG4vLyBJZiB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGUsIHVzZSBtb2R1bGUuZXhwb3J0c1xuLy8gYXMgdGhlIHJlZ2VuZXJhdG9yUnVudGltZSBuYW1lc3BhY2UuIE90aGVyd2lzZSBjcmVhdGUgYSBuZXcgZW1wdHlcbi8vIG9iamVjdC4gRWl0aGVyIHdheSwgdGhlIHJlc3VsdGluZyBvYmplY3Qgd2lsbCBiZSB1c2VkIHRvIGluaXRpYWxpemVcbi8vIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgdmFyaWFibGUgYXQgdGhlIHRvcCBvZiB0aGlzIGZpbGUuXG50eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiID8gbW9kdWxlLmV4cG9ydHMgOiB7fSk7XG50cnkge1xuICByZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xufSBjYXRjaCAoYWNjaWRlbnRhbFN0cmljdE1vZGUpIHtcbiAgLy8gVGhpcyBtb2R1bGUgc2hvdWxkIG5vdCBiZSBydW5uaW5nIGluIHN0cmljdCBtb2RlLCBzbyB0aGUgYWJvdmVcbiAgLy8gYXNzaWdubWVudCBzaG91bGQgYWx3YXlzIHdvcmsgdW5sZXNzIHNvbWV0aGluZyBpcyBtaXNjb25maWd1cmVkLiBKdXN0XG4gIC8vIGluIGNhc2UgcnVudGltZS5qcyBhY2NpZGVudGFsbHkgcnVucyBpbiBzdHJpY3QgbW9kZSwgaW4gbW9kZXJuIGVuZ2luZXNcbiAgLy8gd2UgY2FuIGV4cGxpY2l0bHkgYWNjZXNzIGdsb2JhbFRoaXMuIEluIG9sZGVyIGVuZ2luZXMgd2UgY2FuIGVzY2FwZVxuICAvLyBzdHJpY3QgbW9kZSB1c2luZyBhIGdsb2JhbCBGdW5jdGlvbiBjYWxsLiBUaGlzIGNvdWxkIGNvbmNlaXZhYmx5IGZhaWxcbiAgLy8gaWYgYSBDb250ZW50IFNlY3VyaXR5IFBvbGljeSBmb3JiaWRzIHVzaW5nIEZ1bmN0aW9uLCBidXQgaW4gdGhhdCBjYXNlXG4gIC8vIHRoZSBwcm9wZXIgc29sdXRpb24gaXMgdG8gZml4IHRoZSBhY2NpZGVudGFsIHN0cmljdCBtb2RlIHByb2JsZW0uIElmXG4gIC8vIHlvdSd2ZSBtaXNjb25maWd1cmVkIHlvdXIgYnVuZGxlciB0byBmb3JjZSBzdHJpY3QgbW9kZSBhbmQgYXBwbGllZCBhXG4gIC8vIENTUCB0byBmb3JiaWQgRnVuY3Rpb24sIGFuZCB5b3UncmUgbm90IHdpbGxpbmcgdG8gZml4IGVpdGhlciBvZiB0aG9zZVxuICAvLyBwcm9ibGVtcywgcGxlYXNlIGRldGFpbCB5b3VyIHVuaXF1ZSBwcmVkaWNhbWVudCBpbiBhIEdpdEh1YiBpc3N1ZS5cbiAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSBcIm9iamVjdFwiKSB7XG4gICAgZ2xvYmFsVGhpcy5yZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xuICB9IGVsc2Uge1xuICAgIEZ1bmN0aW9uKFwiclwiLCBcInJlZ2VuZXJhdG9yUnVudGltZSA9IHJcIikocnVudGltZSk7XG4gIH1cbn0iLCJ2YXIgX19kZWZQcm9wID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xudmFyIF9fZXhwb3J0ID0gKHRhcmdldCwgYWxsKSA9PiB7XG4gIGZvciAodmFyIG5hbWUgaW4gYWxsKSBfX2RlZlByb3AodGFyZ2V0LCBuYW1lLCB7XG4gICAgZ2V0OiBhbGxbbmFtZV0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZVxuICB9KTtcbn07XG4vLyBzcmMvdGFza3MvaW5kZXgudHNcbnZhciB0YXNrc19leHBvcnRzID0ge307XG5fX2V4cG9ydCh0YXNrc19leHBvcnRzLCB7XG4gIGF1ZGlvQ2xhc3NpZmljYXRpb246ICgpID0+IGF1ZGlvQ2xhc3NpZmljYXRpb24sXG4gIGF1ZGlvVG9BdWRpbzogKCkgPT4gYXVkaW9Ub0F1ZGlvLFxuICBhdXRvbWF0aWNTcGVlY2hSZWNvZ25pdGlvbjogKCkgPT4gYXV0b21hdGljU3BlZWNoUmVjb2duaXRpb24sXG4gIGNoYXRDb21wbGV0aW9uOiAoKSA9PiBjaGF0Q29tcGxldGlvbixcbiAgY2hhdENvbXBsZXRpb25TdHJlYW06ICgpID0+IGNoYXRDb21wbGV0aW9uU3RyZWFtLFxuICBkb2N1bWVudFF1ZXN0aW9uQW5zd2VyaW5nOiAoKSA9PiBkb2N1bWVudFF1ZXN0aW9uQW5zd2VyaW5nLFxuICBmZWF0dXJlRXh0cmFjdGlvbjogKCkgPT4gZmVhdHVyZUV4dHJhY3Rpb24sXG4gIGZpbGxNYXNrOiAoKSA9PiBmaWxsTWFzayxcbiAgaW1hZ2VDbGFzc2lmaWNhdGlvbjogKCkgPT4gaW1hZ2VDbGFzc2lmaWNhdGlvbixcbiAgaW1hZ2VTZWdtZW50YXRpb246ICgpID0+IGltYWdlU2VnbWVudGF0aW9uLFxuICBpbWFnZVRvSW1hZ2U6ICgpID0+IGltYWdlVG9JbWFnZSxcbiAgaW1hZ2VUb1RleHQ6ICgpID0+IGltYWdlVG9UZXh0LFxuICBvYmplY3REZXRlY3Rpb246ICgpID0+IG9iamVjdERldGVjdGlvbixcbiAgcXVlc3Rpb25BbnN3ZXJpbmc6ICgpID0+IHF1ZXN0aW9uQW5zd2VyaW5nLFxuICByZXF1ZXN0OiAoKSA9PiByZXF1ZXN0LFxuICBzZW50ZW5jZVNpbWlsYXJpdHk6ICgpID0+IHNlbnRlbmNlU2ltaWxhcml0eSxcbiAgc3RyZWFtaW5nUmVxdWVzdDogKCkgPT4gc3RyZWFtaW5nUmVxdWVzdCxcbiAgc3VtbWFyaXphdGlvbjogKCkgPT4gc3VtbWFyaXphdGlvbixcbiAgdGFibGVRdWVzdGlvbkFuc3dlcmluZzogKCkgPT4gdGFibGVRdWVzdGlvbkFuc3dlcmluZyxcbiAgdGFidWxhckNsYXNzaWZpY2F0aW9uOiAoKSA9PiB0YWJ1bGFyQ2xhc3NpZmljYXRpb24sXG4gIHRhYnVsYXJSZWdyZXNzaW9uOiAoKSA9PiB0YWJ1bGFyUmVncmVzc2lvbixcbiAgdGV4dENsYXNzaWZpY2F0aW9uOiAoKSA9PiB0ZXh0Q2xhc3NpZmljYXRpb24sXG4gIHRleHRHZW5lcmF0aW9uOiAoKSA9PiB0ZXh0R2VuZXJhdGlvbixcbiAgdGV4dEdlbmVyYXRpb25TdHJlYW06ICgpID0+IHRleHRHZW5lcmF0aW9uU3RyZWFtLFxuICB0ZXh0VG9JbWFnZTogKCkgPT4gdGV4dFRvSW1hZ2UsXG4gIHRleHRUb1NwZWVjaDogKCkgPT4gdGV4dFRvU3BlZWNoLFxuICB0b2tlbkNsYXNzaWZpY2F0aW9uOiAoKSA9PiB0b2tlbkNsYXNzaWZpY2F0aW9uLFxuICB0cmFuc2xhdGlvbjogKCkgPT4gdHJhbnNsYXRpb24sXG4gIHZpc3VhbFF1ZXN0aW9uQW5zd2VyaW5nOiAoKSA9PiB2aXN1YWxRdWVzdGlvbkFuc3dlcmluZyxcbiAgemVyb1Nob3RDbGFzc2lmaWNhdGlvbjogKCkgPT4gemVyb1Nob3RDbGFzc2lmaWNhdGlvbixcbiAgemVyb1Nob3RJbWFnZUNsYXNzaWZpY2F0aW9uOiAoKSA9PiB6ZXJvU2hvdEltYWdlQ2xhc3NpZmljYXRpb25cbn0pO1xuLy8gc3JjL3V0aWxzL3BpY2sudHNcbmZ1bmN0aW9uIHBpY2sobywgcHJvcHMpIHtcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIC4uLnByb3BzLm1hcChwcm9wID0+IHtcbiAgICBpZiAob1twcm9wXSAhPT0gdm9pZCAwKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBbcHJvcF06IG9bcHJvcF1cbiAgICAgIH07XG4gICAgfVxuICB9KSk7XG59XG4vLyBzcmMvdXRpbHMvdHlwZWRJbmNsdWRlLnRzXG5mdW5jdGlvbiB0eXBlZEluY2x1ZGUoYXJyLCB2KSB7XG4gIHJldHVybiBhcnIuaW5jbHVkZXModik7XG59XG4vLyBzcmMvdXRpbHMvb21pdC50c1xuZnVuY3Rpb24gb21pdChvLCBwcm9wcykge1xuICBjb25zdCBwcm9wc0FyciA9IEFycmF5LmlzQXJyYXkocHJvcHMpID8gcHJvcHMgOiBbcHJvcHNdO1xuICBjb25zdCBsZXRzS2VlcCA9IE9iamVjdC5rZXlzKG8pLmZpbHRlcihwcm9wID0+ICF0eXBlZEluY2x1ZGUocHJvcHNBcnIsIHByb3ApKTtcbiAgcmV0dXJuIHBpY2sobywgbGV0c0tlZXApO1xufVxuLy8gc3JjL2xpYi9pc1VybC50c1xuZnVuY3Rpb24gaXNVcmwobW9kZWxPclVybCkge1xuICByZXR1cm4gL15odHRwKHM/KTovLnRlc3QobW9kZWxPclVybCkgfHwgbW9kZWxPclVybC5zdGFydHNXaXRoKFwiL1wiKTtcbn1cbi8vIHNyYy9saWIvZ2V0RGVmYXVsdFRhc2sudHNcbnZhciB0YXNrQ2FjaGUgPSAvKiBAX19QVVJFX18gKi9uZXcgTWFwKCk7XG52YXIgQ0FDSEVfRFVSQVRJT04gPSAxMCAqIDYwICogMWUzO1xudmFyIE1BWF9DQUNIRV9JVEVNUyA9IDFlMztcbnZhciBIRl9IVUJfVVJMID0gXCJodHRwczovL2h1Z2dpbmdmYWNlLmNvXCI7XG5hc3luYyBmdW5jdGlvbiBnZXREZWZhdWx0VGFzayhtb2RlbCwgYWNjZXNzVG9rZW4sIG9wdGlvbnMpIHtcbiAgaWYgKGlzVXJsKG1vZGVsKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGNvbnN0IGtleSA9IGAke21vZGVsfToke2FjY2Vzc1Rva2VufWA7XG4gIGxldCBjYWNoZWRUYXNrID0gdGFza0NhY2hlLmdldChrZXkpO1xuICBpZiAoY2FjaGVkVGFzayAmJiBjYWNoZWRUYXNrLmRhdGUgPCBuZXcgRGF0ZShEYXRlLm5vdygpIC0gQ0FDSEVfRFVSQVRJT04pKSB7XG4gICAgdGFza0NhY2hlLmRlbGV0ZShrZXkpO1xuICAgIGNhY2hlZFRhc2sgPSB2b2lkIDA7XG4gIH1cbiAgaWYgKGNhY2hlZFRhc2sgPT09IHZvaWQgMCkge1xuICAgIGNvbnN0IG1vZGVsVGFzayA9IGF3YWl0IChvcHRpb25zPy5mZXRjaCA/PyBmZXRjaCkoYCR7SEZfSFVCX1VSTH0vYXBpL21vZGVscy8ke21vZGVsfT9leHBhbmRbXT1waXBlbGluZV90YWdgLCB7XG4gICAgICBoZWFkZXJzOiBhY2Nlc3NUb2tlbiA/IHtcbiAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke2FjY2Vzc1Rva2VufWBcbiAgICAgIH0gOiB7fVxuICAgIH0pLnRoZW4ocmVzcCA9PiByZXNwLmpzb24oKSkudGhlbihqc29uID0+IGpzb24ucGlwZWxpbmVfdGFnKS5jYXRjaCgoKSA9PiBudWxsKTtcbiAgICBpZiAoIW1vZGVsVGFzaykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNhY2hlZFRhc2sgPSB7XG4gICAgICB0YXNrOiBtb2RlbFRhc2ssXG4gICAgICBkYXRlOiAvKiBAX19QVVJFX18gKi9uZXcgRGF0ZSgpXG4gICAgfTtcbiAgICB0YXNrQ2FjaGUuc2V0KGtleSwge1xuICAgICAgdGFzazogbW9kZWxUYXNrLFxuICAgICAgZGF0ZTogLyogQF9fUFVSRV9fICovbmV3IERhdGUoKVxuICAgIH0pO1xuICAgIGlmICh0YXNrQ2FjaGUuc2l6ZSA+IE1BWF9DQUNIRV9JVEVNUykge1xuICAgICAgdGFza0NhY2hlLmRlbGV0ZSh0YXNrQ2FjaGUua2V5cygpLm5leHQoKS52YWx1ZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBjYWNoZWRUYXNrLnRhc2s7XG59XG4vLyBzcmMvbGliL21ha2VSZXF1ZXN0T3B0aW9ucy50c1xudmFyIEhGX0lORkVSRU5DRV9BUElfQkFTRV9VUkwgPSBcImh0dHBzOi8vYXBpLWluZmVyZW5jZS5odWdnaW5nZmFjZS5jb1wiO1xudmFyIHRhc2tzID0gbnVsbDtcbmFzeW5jIGZ1bmN0aW9uIG1ha2VSZXF1ZXN0T3B0aW9ucyhhcmdzLCBvcHRpb25zKSB7XG4gIGNvbnN0IHtcbiAgICBhY2Nlc3NUb2tlbixcbiAgICBlbmRwb2ludFVybCxcbiAgICAuLi5vdGhlckFyZ3NcbiAgfSA9IGFyZ3M7XG4gIGxldCB7XG4gICAgbW9kZWxcbiAgfSA9IGFyZ3M7XG4gIGNvbnN0IHtcbiAgICBmb3JjZVRhc2s6IHRhc2ssXG4gICAgaW5jbHVkZUNyZWRlbnRpYWxzLFxuICAgIHRhc2tIaW50LFxuICAgIHdhaXRfZm9yX21vZGVsLFxuICAgIHVzZV9jYWNoZSxcbiAgICBkb250X2xvYWRfbW9kZWwsXG4gICAgY2hhdENvbXBsZXRpb246IGNoYXRDb21wbGV0aW9uMlxuICB9ID0gb3B0aW9ucyA/PyB7fTtcbiAgY29uc3QgaGVhZGVycyA9IHt9O1xuICBpZiAoYWNjZXNzVG9rZW4pIHtcbiAgICBoZWFkZXJzW1wiQXV0aG9yaXphdGlvblwiXSA9IGBCZWFyZXIgJHthY2Nlc3NUb2tlbn1gO1xuICB9XG4gIGlmICghbW9kZWwgJiYgIXRhc2tzICYmIHRhc2tIaW50KSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYCR7SEZfSFVCX1VSTH0vYXBpL3Rhc2tzYCk7XG4gICAgaWYgKHJlcy5vaykge1xuICAgICAgdGFza3MgPSBhd2FpdCByZXMuanNvbigpO1xuICAgIH1cbiAgfVxuICBpZiAoIW1vZGVsICYmIHRhc2tzICYmIHRhc2tIaW50KSB7XG4gICAgY29uc3QgdGFza0luZm8gPSB0YXNrc1t0YXNrSGludF07XG4gICAgaWYgKHRhc2tJbmZvKSB7XG4gICAgICBtb2RlbCA9IHRhc2tJbmZvLm1vZGVsc1swXS5pZDtcbiAgICB9XG4gIH1cbiAgaWYgKCFtb2RlbCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIk5vIG1vZGVsIHByb3ZpZGVkLCBhbmQgbm8gZGVmYXVsdCBtb2RlbCBmb3VuZCBmb3IgdGhpcyB0YXNrXCIpO1xuICB9XG4gIGNvbnN0IGJpbmFyeSA9IFwiZGF0YVwiIGluIGFyZ3MgJiYgISFhcmdzLmRhdGE7XG4gIGlmICghYmluYXJ5KSB7XG4gICAgaGVhZGVyc1tcIkNvbnRlbnQtVHlwZVwiXSA9IFwiYXBwbGljYXRpb24vanNvblwiO1xuICB9XG4gIGlmICh3YWl0X2Zvcl9tb2RlbCkge1xuICAgIGhlYWRlcnNbXCJYLVdhaXQtRm9yLU1vZGVsXCJdID0gXCJ0cnVlXCI7XG4gIH1cbiAgaWYgKHVzZV9jYWNoZSA9PT0gZmFsc2UpIHtcbiAgICBoZWFkZXJzW1wiWC1Vc2UtQ2FjaGVcIl0gPSBcImZhbHNlXCI7XG4gIH1cbiAgaWYgKGRvbnRfbG9hZF9tb2RlbCkge1xuICAgIGhlYWRlcnNbXCJYLUxvYWQtTW9kZWxcIl0gPSBcIjBcIjtcbiAgfVxuICBsZXQgdXJsID0gKCgpID0+IHtcbiAgICBpZiAoZW5kcG9pbnRVcmwgJiYgaXNVcmwobW9kZWwpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQm90aCBtb2RlbCBhbmQgZW5kcG9pbnRVcmwgY2Fubm90IGJlIFVSTHNcIik7XG4gICAgfVxuICAgIGlmIChpc1VybChtb2RlbCkpIHtcbiAgICAgIGNvbnNvbGUud2FybihcIlVzaW5nIGEgbW9kZWwgVVJMIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgdGhlIGBlbmRwb2ludFVybGAgcGFyYW1ldGVyIGluc3RlYWRcIik7XG4gICAgICByZXR1cm4gbW9kZWw7XG4gICAgfVxuICAgIGlmIChlbmRwb2ludFVybCkge1xuICAgICAgcmV0dXJuIGVuZHBvaW50VXJsO1xuICAgIH1cbiAgICBpZiAodGFzaykge1xuICAgICAgcmV0dXJuIGAke0hGX0lORkVSRU5DRV9BUElfQkFTRV9VUkx9L3BpcGVsaW5lLyR7dGFza30vJHttb2RlbH1gO1xuICAgIH1cbiAgICByZXR1cm4gYCR7SEZfSU5GRVJFTkNFX0FQSV9CQVNFX1VSTH0vbW9kZWxzLyR7bW9kZWx9YDtcbiAgfSkoKTtcbiAgaWYgKGNoYXRDb21wbGV0aW9uMiAmJiAhdXJsLmVuZHNXaXRoKFwiL2NoYXQvY29tcGxldGlvbnNcIikpIHtcbiAgICB1cmwgKz0gXCIvdjEvY2hhdC9jb21wbGV0aW9uc1wiO1xuICB9XG4gIGxldCBjcmVkZW50aWFscztcbiAgaWYgKHR5cGVvZiBpbmNsdWRlQ3JlZGVudGlhbHMgPT09IFwic3RyaW5nXCIpIHtcbiAgICBjcmVkZW50aWFscyA9IGluY2x1ZGVDcmVkZW50aWFscztcbiAgfSBlbHNlIGlmIChpbmNsdWRlQ3JlZGVudGlhbHMgPT09IHRydWUpIHtcbiAgICBjcmVkZW50aWFscyA9IFwiaW5jbHVkZVwiO1xuICB9XG4gIGNvbnN0IGluZm8gPSB7XG4gICAgaGVhZGVycyxcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIGJvZHk6IGJpbmFyeSA/IGFyZ3MuZGF0YSA6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIC4uLihvdGhlckFyZ3MubW9kZWwgJiYgaXNVcmwob3RoZXJBcmdzLm1vZGVsKSA/IG9taXQob3RoZXJBcmdzLCBcIm1vZGVsXCIpIDogb3RoZXJBcmdzKVxuICAgIH0pLFxuICAgIC4uLihjcmVkZW50aWFscyAmJiB7XG4gICAgICBjcmVkZW50aWFsc1xuICAgIH0pLFxuICAgIHNpZ25hbDogb3B0aW9ucz8uc2lnbmFsXG4gIH07XG4gIHJldHVybiB7XG4gICAgdXJsLFxuICAgIGluZm9cbiAgfTtcbn1cbi8vIHNyYy90YXNrcy9jdXN0b20vcmVxdWVzdC50c1xuYXN5bmMgZnVuY3Rpb24gcmVxdWVzdChhcmdzLCBvcHRpb25zKSB7XG4gIGNvbnN0IHtcbiAgICB1cmwsXG4gICAgaW5mb1xuICB9ID0gYXdhaXQgbWFrZVJlcXVlc3RPcHRpb25zKGFyZ3MsIG9wdGlvbnMpO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IChvcHRpb25zPy5mZXRjaCA/PyBmZXRjaCkodXJsLCBpbmZvKTtcbiAgaWYgKG9wdGlvbnM/LnJldHJ5X29uX2Vycm9yICE9PSBmYWxzZSAmJiByZXNwb25zZS5zdGF0dXMgPT09IDUwMyAmJiAhb3B0aW9ucz8ud2FpdF9mb3JfbW9kZWwpIHtcbiAgICByZXR1cm4gcmVxdWVzdChhcmdzLCB7XG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgd2FpdF9mb3JfbW9kZWw6IHRydWVcbiAgICB9KTtcbiAgfVxuICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgaWYgKHJlc3BvbnNlLmhlYWRlcnMuZ2V0KFwiQ29udGVudC1UeXBlXCIpPy5zdGFydHNXaXRoKFwiYXBwbGljYXRpb24vanNvblwiKSkge1xuICAgICAgY29uc3Qgb3V0cHV0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgaWYgKFs0MDAsIDQyMiwgNDA0LCA1MDBdLmluY2x1ZGVzKHJlc3BvbnNlLnN0YXR1cykgJiYgb3B0aW9ucz8uY2hhdENvbXBsZXRpb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBTZXJ2ZXIgJHthcmdzLm1vZGVsfSBkb2VzIG5vdCBzZWVtIHRvIHN1cHBvcnQgY2hhdCBjb21wbGV0aW9uLiBFcnJvcjogJHtvdXRwdXQuZXJyb3J9YCk7XG4gICAgICB9XG4gICAgICBpZiAob3V0cHV0LmVycm9yKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihvdXRwdXQuZXJyb3IpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBmZXRjaGluZyB0aGUgYmxvYlwiKTtcbiAgfVxuICBpZiAocmVzcG9uc2UuaGVhZGVycy5nZXQoXCJDb250ZW50LVR5cGVcIik/LnN0YXJ0c1dpdGgoXCJhcHBsaWNhdGlvbi9qc29uXCIpKSB7XG4gICAgcmV0dXJuIGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgfVxuICByZXR1cm4gYXdhaXQgcmVzcG9uc2UuYmxvYigpO1xufVxuLy8gc3JjL3ZlbmRvci9mZXRjaC1ldmVudC1zb3VyY2UvcGFyc2UudHNcbmZ1bmN0aW9uIGdldExpbmVzKG9uTGluZSkge1xuICBsZXQgYnVmZmVyO1xuICBsZXQgcG9zaXRpb247XG4gIGxldCBmaWVsZExlbmd0aDtcbiAgbGV0IGRpc2NhcmRUcmFpbGluZ05ld2xpbmUgPSBmYWxzZTtcbiAgcmV0dXJuIGZ1bmN0aW9uIG9uQ2h1bmsoYXJyKSB7XG4gICAgaWYgKGJ1ZmZlciA9PT0gdm9pZCAwKSB7XG4gICAgICBidWZmZXIgPSBhcnI7XG4gICAgICBwb3NpdGlvbiA9IDA7XG4gICAgICBmaWVsZExlbmd0aCA9IC0xO1xuICAgIH0gZWxzZSB7XG4gICAgICBidWZmZXIgPSBjb25jYXQoYnVmZmVyLCBhcnIpO1xuICAgIH1cbiAgICBjb25zdCBidWZMZW5ndGggPSBidWZmZXIubGVuZ3RoO1xuICAgIGxldCBsaW5lU3RhcnQgPSAwO1xuICAgIHdoaWxlIChwb3NpdGlvbiA8IGJ1Zkxlbmd0aCkge1xuICAgICAgaWYgKGRpc2NhcmRUcmFpbGluZ05ld2xpbmUpIHtcbiAgICAgICAgaWYgKGJ1ZmZlcltwb3NpdGlvbl0gPT09IDEwIC8qIE5ld0xpbmUgKi8pIHtcbiAgICAgICAgICBsaW5lU3RhcnQgPSArK3Bvc2l0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGRpc2NhcmRUcmFpbGluZ05ld2xpbmUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGxldCBsaW5lRW5kID0gLTE7XG4gICAgICBmb3IgKDsgcG9zaXRpb24gPCBidWZMZW5ndGggJiYgbGluZUVuZCA9PT0gLTE7ICsrcG9zaXRpb24pIHtcbiAgICAgICAgc3dpdGNoIChidWZmZXJbcG9zaXRpb25dKSB7XG4gICAgICAgICAgY2FzZSA1OCAvKiBDb2xvbiAqLzpcbiAgICAgICAgICAgIGlmIChmaWVsZExlbmd0aCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgZmllbGRMZW5ndGggPSBwb3NpdGlvbiAtIGxpbmVTdGFydDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgMTMgLyogQ2FycmlhZ2VSZXR1cm4gKi86XG4gICAgICAgICAgICBkaXNjYXJkVHJhaWxpbmdOZXdsaW5lID0gdHJ1ZTtcbiAgICAgICAgICBjYXNlIDEwIC8qIE5ld0xpbmUgKi86XG4gICAgICAgICAgICBsaW5lRW5kID0gcG9zaXRpb247XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGxpbmVFbmQgPT09IC0xKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgb25MaW5lKGJ1ZmZlci5zdWJhcnJheShsaW5lU3RhcnQsIGxpbmVFbmQpLCBmaWVsZExlbmd0aCk7XG4gICAgICBsaW5lU3RhcnQgPSBwb3NpdGlvbjtcbiAgICAgIGZpZWxkTGVuZ3RoID0gLTE7XG4gICAgfVxuICAgIGlmIChsaW5lU3RhcnQgPT09IGJ1Zkxlbmd0aCkge1xuICAgICAgYnVmZmVyID0gdm9pZCAwO1xuICAgIH0gZWxzZSBpZiAobGluZVN0YXJ0ICE9PSAwKSB7XG4gICAgICBidWZmZXIgPSBidWZmZXIuc3ViYXJyYXkobGluZVN0YXJ0KTtcbiAgICAgIHBvc2l0aW9uIC09IGxpbmVTdGFydDtcbiAgICB9XG4gIH07XG59XG5mdW5jdGlvbiBnZXRNZXNzYWdlcyhvbklkLCBvblJldHJ5LCBvbk1lc3NhZ2UpIHtcbiAgbGV0IG1lc3NhZ2UgPSBuZXdNZXNzYWdlKCk7XG4gIGNvbnN0IGRlY29kZXIgPSBuZXcgVGV4dERlY29kZXIoKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIG9uTGluZShsaW5lLCBmaWVsZExlbmd0aCkge1xuICAgIGlmIChsaW5lLmxlbmd0aCA9PT0gMCkge1xuICAgICAgb25NZXNzYWdlPy4obWVzc2FnZSk7XG4gICAgICBtZXNzYWdlID0gbmV3TWVzc2FnZSgpO1xuICAgIH0gZWxzZSBpZiAoZmllbGRMZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBmaWVsZCA9IGRlY29kZXIuZGVjb2RlKGxpbmUuc3ViYXJyYXkoMCwgZmllbGRMZW5ndGgpKTtcbiAgICAgIGNvbnN0IHZhbHVlT2Zmc2V0ID0gZmllbGRMZW5ndGggKyAobGluZVtmaWVsZExlbmd0aCArIDFdID09PSAzMiAvKiBTcGFjZSAqLyA/IDIgOiAxKTtcbiAgICAgIGNvbnN0IHZhbHVlID0gZGVjb2Rlci5kZWNvZGUobGluZS5zdWJhcnJheSh2YWx1ZU9mZnNldCkpO1xuICAgICAgc3dpdGNoIChmaWVsZCkge1xuICAgICAgICBjYXNlIFwiZGF0YVwiOlxuICAgICAgICAgIG1lc3NhZ2UuZGF0YSA9IG1lc3NhZ2UuZGF0YSA/IG1lc3NhZ2UuZGF0YSArIFwiXFxuXCIgKyB2YWx1ZSA6IHZhbHVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZXZlbnRcIjpcbiAgICAgICAgICBtZXNzYWdlLmV2ZW50ID0gdmFsdWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJpZFwiOlxuICAgICAgICAgIG9uSWQobWVzc2FnZS5pZCA9IHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInJldHJ5XCI6XG4gICAgICAgICAgY29uc3QgcmV0cnkgPSBwYXJzZUludCh2YWx1ZSwgMTApO1xuICAgICAgICAgIGlmICghaXNOYU4ocmV0cnkpKSB7XG4gICAgICAgICAgICBvblJldHJ5KG1lc3NhZ2UucmV0cnkgPSByZXRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cbmZ1bmN0aW9uIGNvbmNhdChhLCBiKSB7XG4gIGNvbnN0IHJlcyA9IG5ldyBVaW50OEFycmF5KGEubGVuZ3RoICsgYi5sZW5ndGgpO1xuICByZXMuc2V0KGEpO1xuICByZXMuc2V0KGIsIGEubGVuZ3RoKTtcbiAgcmV0dXJuIHJlcztcbn1cbmZ1bmN0aW9uIG5ld01lc3NhZ2UoKSB7XG4gIHJldHVybiB7XG4gICAgZGF0YTogXCJcIixcbiAgICBldmVudDogXCJcIixcbiAgICBpZDogXCJcIixcbiAgICByZXRyeTogdm9pZCAwXG4gIH07XG59XG4vLyBzcmMvdGFza3MvY3VzdG9tL3N0cmVhbWluZ1JlcXVlc3QudHNcbmFzeW5jIGZ1bmN0aW9uKiBzdHJlYW1pbmdSZXF1ZXN0KGFyZ3MsIG9wdGlvbnMpIHtcbiAgY29uc3Qge1xuICAgIHVybCxcbiAgICBpbmZvXG4gIH0gPSBhd2FpdCBtYWtlUmVxdWVzdE9wdGlvbnMoe1xuICAgIC4uLmFyZ3MsXG4gICAgc3RyZWFtOiB0cnVlXG4gIH0sIG9wdGlvbnMpO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IChvcHRpb25zPy5mZXRjaCA/PyBmZXRjaCkodXJsLCBpbmZvKTtcbiAgaWYgKG9wdGlvbnM/LnJldHJ5X29uX2Vycm9yICE9PSBmYWxzZSAmJiByZXNwb25zZS5zdGF0dXMgPT09IDUwMyAmJiAhb3B0aW9ucz8ud2FpdF9mb3JfbW9kZWwpIHtcbiAgICByZXR1cm4geWllbGQqIHN0cmVhbWluZ1JlcXVlc3QoYXJncywge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIHdhaXRfZm9yX21vZGVsOiB0cnVlXG4gICAgfSk7XG4gIH1cbiAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgIGlmIChyZXNwb25zZS5oZWFkZXJzLmdldChcIkNvbnRlbnQtVHlwZVwiKT8uc3RhcnRzV2l0aChcImFwcGxpY2F0aW9uL2pzb25cIikpIHtcbiAgICAgIGNvbnN0IG91dHB1dCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIGlmIChbNDAwLCA0MjIsIDQwNCwgNTAwXS5pbmNsdWRlcyhyZXNwb25zZS5zdGF0dXMpICYmIG9wdGlvbnM/LmNoYXRDb21wbGV0aW9uKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgU2VydmVyICR7YXJncy5tb2RlbH0gZG9lcyBub3Qgc2VlbSB0byBzdXBwb3J0IGNoYXQgY29tcGxldGlvbi4gRXJyb3I6ICR7b3V0cHV0LmVycm9yfWApO1xuICAgICAgfVxuICAgICAgaWYgKG91dHB1dC5lcnJvcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3Iob3V0cHV0LmVycm9yKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKGBTZXJ2ZXIgcmVzcG9uc2UgY29udGFpbnMgZXJyb3I6ICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xuICB9XG4gIGlmICghcmVzcG9uc2UuaGVhZGVycy5nZXQoXCJjb250ZW50LXR5cGVcIik/LnN0YXJ0c1dpdGgoXCJ0ZXh0L2V2ZW50LXN0cmVhbVwiKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgU2VydmVyIGRvZXMgbm90IHN1cHBvcnQgZXZlbnQgc3RyZWFtIGNvbnRlbnQgdHlwZSwgaXQgcmV0dXJuZWQgYCArIHJlc3BvbnNlLmhlYWRlcnMuZ2V0KFwiY29udGVudC10eXBlXCIpKTtcbiAgfVxuICBpZiAoIXJlc3BvbnNlLmJvZHkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgcmVhZGVyID0gcmVzcG9uc2UuYm9keS5nZXRSZWFkZXIoKTtcbiAgbGV0IGV2ZW50cyA9IFtdO1xuICBjb25zdCBvbkV2ZW50ID0gZXZlbnQgPT4ge1xuICAgIGV2ZW50cy5wdXNoKGV2ZW50KTtcbiAgfTtcbiAgY29uc3Qgb25DaHVuayA9IGdldExpbmVzKGdldE1lc3NhZ2VzKCgpID0+IHt9LCAoKSA9PiB7fSwgb25FdmVudCkpO1xuICB0cnkge1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGRvbmUsXG4gICAgICAgIHZhbHVlXG4gICAgICB9ID0gYXdhaXQgcmVhZGVyLnJlYWQoKTtcbiAgICAgIGlmIChkb25lKSByZXR1cm47XG4gICAgICBvbkNodW5rKHZhbHVlKTtcbiAgICAgIGZvciAoY29uc3QgZXZlbnQgb2YgZXZlbnRzKSB7XG4gICAgICAgIGlmIChldmVudC5kYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBpZiAoZXZlbnQuZGF0YSA9PT0gXCJbRE9ORV1cIikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShldmVudC5kYXRhKTtcbiAgICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT09IFwib2JqZWN0XCIgJiYgZGF0YSAhPT0gbnVsbCAmJiBcImVycm9yXCIgaW4gZGF0YSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGRhdGEuZXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB5aWVsZCBkYXRhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBldmVudHMgPSBbXTtcbiAgICB9XG4gIH0gZmluYWxseSB7XG4gICAgcmVhZGVyLnJlbGVhc2VMb2NrKCk7XG4gIH1cbn1cbi8vIHNyYy9saWIvSW5mZXJlbmNlT3V0cHV0RXJyb3IudHNcbnZhciBJbmZlcmVuY2VPdXRwdXRFcnJvciA9IGNsYXNzIGV4dGVuZHMgVHlwZUVycm9yIHtcbiAgY29uc3RydWN0b3IobWVzc2FnZSkge1xuICAgIHN1cGVyKGBJbnZhbGlkIGluZmVyZW5jZSBvdXRwdXQ6ICR7bWVzc2FnZX0uIFVzZSB0aGUgJ3JlcXVlc3QnIG1ldGhvZCB3aXRoIHRoZSBzYW1lIHBhcmFtZXRlcnMgdG8gZG8gYSBjdXN0b20gY2FsbCB3aXRoIG5vIHR5cGUgY2hlY2tpbmcuYCk7XG4gICAgdGhpcy5uYW1lID0gXCJJbmZlcmVuY2VPdXRwdXRFcnJvclwiO1xuICB9XG59O1xuLy8gc3JjL3Rhc2tzL2F1ZGlvL2F1ZGlvQ2xhc3NpZmljYXRpb24udHNcbmFzeW5jIGZ1bmN0aW9uIGF1ZGlvQ2xhc3NpZmljYXRpb24oYXJncywgb3B0aW9ucykge1xuICBjb25zdCByZXMgPSBhd2FpdCByZXF1ZXN0KGFyZ3MsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIHRhc2tIaW50OiBcImF1ZGlvLWNsYXNzaWZpY2F0aW9uXCJcbiAgfSk7XG4gIGNvbnN0IGlzVmFsaWRPdXRwdXQgPSBBcnJheS5pc0FycmF5KHJlcykgJiYgcmVzLmV2ZXJ5KHggPT4gdHlwZW9mIHgubGFiZWwgPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIHguc2NvcmUgPT09IFwibnVtYmVyXCIpO1xuICBpZiAoIWlzVmFsaWRPdXRwdXQpIHtcbiAgICB0aHJvdyBuZXcgSW5mZXJlbmNlT3V0cHV0RXJyb3IoXCJFeHBlY3RlZCBBcnJheTx7bGFiZWw6IHN0cmluZywgc2NvcmU6IG51bWJlcn0+XCIpO1xuICB9XG4gIHJldHVybiByZXM7XG59XG4vLyBzcmMvdGFza3MvYXVkaW8vYXV0b21hdGljU3BlZWNoUmVjb2duaXRpb24udHNcbmFzeW5jIGZ1bmN0aW9uIGF1dG9tYXRpY1NwZWVjaFJlY29nbml0aW9uKGFyZ3MsIG9wdGlvbnMpIHtcbiAgY29uc3QgcmVzID0gYXdhaXQgcmVxdWVzdChhcmdzLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICB0YXNrSGludDogXCJhdXRvbWF0aWMtc3BlZWNoLXJlY29nbml0aW9uXCJcbiAgfSk7XG4gIGNvbnN0IGlzVmFsaWRPdXRwdXQgPSB0eXBlb2YgcmVzPy50ZXh0ID09PSBcInN0cmluZ1wiO1xuICBpZiAoIWlzVmFsaWRPdXRwdXQpIHtcbiAgICB0aHJvdyBuZXcgSW5mZXJlbmNlT3V0cHV0RXJyb3IoXCJFeHBlY3RlZCB7dGV4dDogc3RyaW5nfVwiKTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuLy8gc3JjL3Rhc2tzL2F1ZGlvL3RleHRUb1NwZWVjaC50c1xuYXN5bmMgZnVuY3Rpb24gdGV4dFRvU3BlZWNoKGFyZ3MsIG9wdGlvbnMpIHtcbiAgY29uc3QgcmVzID0gYXdhaXQgcmVxdWVzdChhcmdzLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICB0YXNrSGludDogXCJ0ZXh0LXRvLXNwZWVjaFwiXG4gIH0pO1xuICBjb25zdCBpc1ZhbGlkT3V0cHV0ID0gcmVzICYmIHJlcyBpbnN0YW5jZW9mIEJsb2I7XG4gIGlmICghaXNWYWxpZE91dHB1dCkge1xuICAgIHRocm93IG5ldyBJbmZlcmVuY2VPdXRwdXRFcnJvcihcIkV4cGVjdGVkIEJsb2JcIik7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cbi8vIHNyYy90YXNrcy9hdWRpby9hdWRpb1RvQXVkaW8udHNcbmFzeW5jIGZ1bmN0aW9uIGF1ZGlvVG9BdWRpbyhhcmdzLCBvcHRpb25zKSB7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IHJlcXVlc3QoYXJncywge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgdGFza0hpbnQ6IFwiYXVkaW8tdG8tYXVkaW9cIlxuICB9KTtcbiAgY29uc3QgaXNWYWxpZE91dHB1dCA9IEFycmF5LmlzQXJyYXkocmVzKSAmJiByZXMuZXZlcnkoeCA9PiB0eXBlb2YgeC5sYWJlbCA9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgeC5ibG9iID09PSBcInN0cmluZ1wiICYmIHR5cGVvZiB4W1wiY29udGVudC10eXBlXCJdID09PSBcInN0cmluZ1wiKTtcbiAgaWYgKCFpc1ZhbGlkT3V0cHV0KSB7XG4gICAgdGhyb3cgbmV3IEluZmVyZW5jZU91dHB1dEVycm9yKFwiRXhwZWN0ZWQgQXJyYXk8e2xhYmVsOiBzdHJpbmcsIGJsb2I6IHN0cmluZywgY29udGVudC10eXBlOiBzdHJpbmd9PlwiKTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuLy8gc3JjL3Rhc2tzL2N2L2ltYWdlQ2xhc3NpZmljYXRpb24udHNcbmFzeW5jIGZ1bmN0aW9uIGltYWdlQ2xhc3NpZmljYXRpb24oYXJncywgb3B0aW9ucykge1xuICBjb25zdCByZXMgPSBhd2FpdCByZXF1ZXN0KGFyZ3MsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIHRhc2tIaW50OiBcImltYWdlLWNsYXNzaWZpY2F0aW9uXCJcbiAgfSk7XG4gIGNvbnN0IGlzVmFsaWRPdXRwdXQgPSBBcnJheS5pc0FycmF5KHJlcykgJiYgcmVzLmV2ZXJ5KHggPT4gdHlwZW9mIHgubGFiZWwgPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIHguc2NvcmUgPT09IFwibnVtYmVyXCIpO1xuICBpZiAoIWlzVmFsaWRPdXRwdXQpIHtcbiAgICB0aHJvdyBuZXcgSW5mZXJlbmNlT3V0cHV0RXJyb3IoXCJFeHBlY3RlZCBBcnJheTx7bGFiZWw6IHN0cmluZywgc2NvcmU6IG51bWJlcn0+XCIpO1xuICB9XG4gIHJldHVybiByZXM7XG59XG4vLyBzcmMvdGFza3MvY3YvaW1hZ2VTZWdtZW50YXRpb24udHNcbmFzeW5jIGZ1bmN0aW9uIGltYWdlU2VnbWVudGF0aW9uKGFyZ3MsIG9wdGlvbnMpIHtcbiAgY29uc3QgcmVzID0gYXdhaXQgcmVxdWVzdChhcmdzLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICB0YXNrSGludDogXCJpbWFnZS1zZWdtZW50YXRpb25cIlxuICB9KTtcbiAgY29uc3QgaXNWYWxpZE91dHB1dCA9IEFycmF5LmlzQXJyYXkocmVzKSAmJiByZXMuZXZlcnkoeCA9PiB0eXBlb2YgeC5sYWJlbCA9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgeC5tYXNrID09PSBcInN0cmluZ1wiICYmIHR5cGVvZiB4LnNjb3JlID09PSBcIm51bWJlclwiKTtcbiAgaWYgKCFpc1ZhbGlkT3V0cHV0KSB7XG4gICAgdGhyb3cgbmV3IEluZmVyZW5jZU91dHB1dEVycm9yKFwiRXhwZWN0ZWQgQXJyYXk8e2xhYmVsOiBzdHJpbmcsIG1hc2s6IHN0cmluZywgc2NvcmU6IG51bWJlcn0+XCIpO1xuICB9XG4gIHJldHVybiByZXM7XG59XG4vLyBzcmMvdGFza3MvY3YvaW1hZ2VUb1RleHQudHNcbmFzeW5jIGZ1bmN0aW9uIGltYWdlVG9UZXh0KGFyZ3MsIG9wdGlvbnMpIHtcbiAgY29uc3QgcmVzID0gKGF3YWl0IHJlcXVlc3QoYXJncywge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgdGFza0hpbnQ6IFwiaW1hZ2UtdG8tdGV4dFwiXG4gIH0pKT8uWzBdO1xuICBpZiAodHlwZW9mIHJlcz8uZ2VuZXJhdGVkX3RleHQgIT09IFwic3RyaW5nXCIpIHtcbiAgICB0aHJvdyBuZXcgSW5mZXJlbmNlT3V0cHV0RXJyb3IoXCJFeHBlY3RlZCB7Z2VuZXJhdGVkX3RleHQ6IHN0cmluZ31cIik7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cbi8vIHNyYy90YXNrcy9jdi9vYmplY3REZXRlY3Rpb24udHNcbmFzeW5jIGZ1bmN0aW9uIG9iamVjdERldGVjdGlvbihhcmdzLCBvcHRpb25zKSB7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IHJlcXVlc3QoYXJncywge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgdGFza0hpbnQ6IFwib2JqZWN0LWRldGVjdGlvblwiXG4gIH0pO1xuICBjb25zdCBpc1ZhbGlkT3V0cHV0ID0gQXJyYXkuaXNBcnJheShyZXMpICYmIHJlcy5ldmVyeSh4ID0+IHR5cGVvZiB4LmxhYmVsID09PSBcInN0cmluZ1wiICYmIHR5cGVvZiB4LnNjb3JlID09PSBcIm51bWJlclwiICYmIHR5cGVvZiB4LmJveC54bWluID09PSBcIm51bWJlclwiICYmIHR5cGVvZiB4LmJveC55bWluID09PSBcIm51bWJlclwiICYmIHR5cGVvZiB4LmJveC54bWF4ID09PSBcIm51bWJlclwiICYmIHR5cGVvZiB4LmJveC55bWF4ID09PSBcIm51bWJlclwiKTtcbiAgaWYgKCFpc1ZhbGlkT3V0cHV0KSB7XG4gICAgdGhyb3cgbmV3IEluZmVyZW5jZU91dHB1dEVycm9yKFwiRXhwZWN0ZWQgQXJyYXk8e2xhYmVsOnN0cmluZzsgc2NvcmU6bnVtYmVyOyBib3g6e3htaW46bnVtYmVyOyB5bWluOm51bWJlcjsgeG1heDpudW1iZXI7IHltYXg6bnVtYmVyfX0+XCIpO1xuICB9XG4gIHJldHVybiByZXM7XG59XG4vLyBzcmMvdGFza3MvY3YvdGV4dFRvSW1hZ2UudHNcbmFzeW5jIGZ1bmN0aW9uIHRleHRUb0ltYWdlKGFyZ3MsIG9wdGlvbnMpIHtcbiAgY29uc3QgcmVzID0gYXdhaXQgcmVxdWVzdChhcmdzLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICB0YXNrSGludDogXCJ0ZXh0LXRvLWltYWdlXCJcbiAgfSk7XG4gIGNvbnN0IGlzVmFsaWRPdXRwdXQgPSByZXMgJiYgcmVzIGluc3RhbmNlb2YgQmxvYjtcbiAgaWYgKCFpc1ZhbGlkT3V0cHV0KSB7XG4gICAgdGhyb3cgbmV3IEluZmVyZW5jZU91dHB1dEVycm9yKFwiRXhwZWN0ZWQgQmxvYlwiKTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuLy8gc3JjL3V0aWxzL2Jhc2U2NEZyb21CeXRlcy50c1xuZnVuY3Rpb24gYmFzZTY0RnJvbUJ5dGVzKGFycikge1xuICBpZiAoZ2xvYmFsVGhpcy5CdWZmZXIpIHtcbiAgICByZXR1cm4gZ2xvYmFsVGhpcy5CdWZmZXIuZnJvbShhcnIpLnRvU3RyaW5nKFwiYmFzZTY0XCIpO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IGJpbiA9IFtdO1xuICAgIGFyci5mb3JFYWNoKGJ5dGUgPT4ge1xuICAgICAgYmluLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShieXRlKSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGdsb2JhbFRoaXMuYnRvYShiaW4uam9pbihcIlwiKSk7XG4gIH1cbn1cbi8vIHNyYy90YXNrcy9jdi9pbWFnZVRvSW1hZ2UudHNcbmFzeW5jIGZ1bmN0aW9uIGltYWdlVG9JbWFnZShhcmdzLCBvcHRpb25zKSB7XG4gIGxldCByZXFBcmdzO1xuICBpZiAoIWFyZ3MucGFyYW1ldGVycykge1xuICAgIHJlcUFyZ3MgPSB7XG4gICAgICBhY2Nlc3NUb2tlbjogYXJncy5hY2Nlc3NUb2tlbixcbiAgICAgIG1vZGVsOiBhcmdzLm1vZGVsLFxuICAgICAgZGF0YTogYXJncy5pbnB1dHNcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIHJlcUFyZ3MgPSB7XG4gICAgICAuLi5hcmdzLFxuICAgICAgaW5wdXRzOiBiYXNlNjRGcm9tQnl0ZXMobmV3IFVpbnQ4QXJyYXkoYXJncy5pbnB1dHMgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlciA/IGFyZ3MuaW5wdXRzIDogYXdhaXQgYXJncy5pbnB1dHMuYXJyYXlCdWZmZXIoKSkpXG4gICAgfTtcbiAgfVxuICBjb25zdCByZXMgPSBhd2FpdCByZXF1ZXN0KHJlcUFyZ3MsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIHRhc2tIaW50OiBcImltYWdlLXRvLWltYWdlXCJcbiAgfSk7XG4gIGNvbnN0IGlzVmFsaWRPdXRwdXQgPSByZXMgJiYgcmVzIGluc3RhbmNlb2YgQmxvYjtcbiAgaWYgKCFpc1ZhbGlkT3V0cHV0KSB7XG4gICAgdGhyb3cgbmV3IEluZmVyZW5jZU91dHB1dEVycm9yKFwiRXhwZWN0ZWQgQmxvYlwiKTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuLy8gc3JjL3Rhc2tzL2N2L3plcm9TaG90SW1hZ2VDbGFzc2lmaWNhdGlvbi50c1xuYXN5bmMgZnVuY3Rpb24gemVyb1Nob3RJbWFnZUNsYXNzaWZpY2F0aW9uKGFyZ3MsIG9wdGlvbnMpIHtcbiAgY29uc3QgcmVxQXJncyA9IHtcbiAgICAuLi5hcmdzLFxuICAgIGlucHV0czoge1xuICAgICAgaW1hZ2U6IGJhc2U2NEZyb21CeXRlcyhuZXcgVWludDhBcnJheShhcmdzLmlucHV0cy5pbWFnZSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyID8gYXJncy5pbnB1dHMuaW1hZ2UgOiBhd2FpdCBhcmdzLmlucHV0cy5pbWFnZS5hcnJheUJ1ZmZlcigpKSlcbiAgICB9XG4gIH07XG4gIGNvbnN0IHJlcyA9IGF3YWl0IHJlcXVlc3QocmVxQXJncywge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgdGFza0hpbnQ6IFwiemVyby1zaG90LWltYWdlLWNsYXNzaWZpY2F0aW9uXCJcbiAgfSk7XG4gIGNvbnN0IGlzVmFsaWRPdXRwdXQgPSBBcnJheS5pc0FycmF5KHJlcykgJiYgcmVzLmV2ZXJ5KHggPT4gdHlwZW9mIHgubGFiZWwgPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIHguc2NvcmUgPT09IFwibnVtYmVyXCIpO1xuICBpZiAoIWlzVmFsaWRPdXRwdXQpIHtcbiAgICB0aHJvdyBuZXcgSW5mZXJlbmNlT3V0cHV0RXJyb3IoXCJFeHBlY3RlZCBBcnJheTx7bGFiZWw6IHN0cmluZywgc2NvcmU6IG51bWJlcn0+XCIpO1xuICB9XG4gIHJldHVybiByZXM7XG59XG4vLyBzcmMvdGFza3MvbmxwL2ZlYXR1cmVFeHRyYWN0aW9uLnRzXG5hc3luYyBmdW5jdGlvbiBmZWF0dXJlRXh0cmFjdGlvbihhcmdzLCBvcHRpb25zKSB7XG4gIGNvbnN0IGRlZmF1bHRUYXNrID0gYXJncy5tb2RlbCA/IGF3YWl0IGdldERlZmF1bHRUYXNrKGFyZ3MubW9kZWwsIGFyZ3MuYWNjZXNzVG9rZW4sIG9wdGlvbnMpIDogdm9pZCAwO1xuICBjb25zdCByZXMgPSBhd2FpdCByZXF1ZXN0KGFyZ3MsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIHRhc2tIaW50OiBcImZlYXR1cmUtZXh0cmFjdGlvblwiLFxuICAgIC4uLihkZWZhdWx0VGFzayA9PT0gXCJzZW50ZW5jZS1zaW1pbGFyaXR5XCIgJiYge1xuICAgICAgZm9yY2VUYXNrOiBcImZlYXR1cmUtZXh0cmFjdGlvblwiXG4gICAgfSlcbiAgfSk7XG4gIGxldCBpc1ZhbGlkT3V0cHV0ID0gdHJ1ZTtcbiAgY29uc3QgaXNOdW1BcnJheVJlYyA9IGZ1bmN0aW9uIChhcnIsIG1heERlcHRoKSB7XG4gICAgbGV0IGN1ckRlcHRoID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiAwO1xuICAgIGlmIChjdXJEZXB0aCA+IG1heERlcHRoKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGFyci5ldmVyeSh4ID0+IEFycmF5LmlzQXJyYXkoeCkpKSB7XG4gICAgICByZXR1cm4gYXJyLmV2ZXJ5KHggPT4gaXNOdW1BcnJheVJlYyh4LCBtYXhEZXB0aCwgY3VyRGVwdGggKyAxKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBhcnIuZXZlcnkoeCA9PiB0eXBlb2YgeCA9PT0gXCJudW1iZXJcIik7XG4gICAgfVxuICB9O1xuICBpc1ZhbGlkT3V0cHV0ID0gQXJyYXkuaXNBcnJheShyZXMpICYmIGlzTnVtQXJyYXlSZWMocmVzLCAzLCAwKTtcbiAgaWYgKCFpc1ZhbGlkT3V0cHV0KSB7XG4gICAgdGhyb3cgbmV3IEluZmVyZW5jZU91dHB1dEVycm9yKFwiRXhwZWN0ZWQgQXJyYXk8bnVtYmVyW11bXVtdIHwgbnVtYmVyW11bXSB8IG51bWJlcltdIHwgbnVtYmVyPlwiKTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuLy8gc3JjL3Rhc2tzL25scC9maWxsTWFzay50c1xuYXN5bmMgZnVuY3Rpb24gZmlsbE1hc2soYXJncywgb3B0aW9ucykge1xuICBjb25zdCByZXMgPSBhd2FpdCByZXF1ZXN0KGFyZ3MsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIHRhc2tIaW50OiBcImZpbGwtbWFza1wiXG4gIH0pO1xuICBjb25zdCBpc1ZhbGlkT3V0cHV0ID0gQXJyYXkuaXNBcnJheShyZXMpICYmIHJlcy5ldmVyeSh4ID0+IHR5cGVvZiB4LnNjb3JlID09PSBcIm51bWJlclwiICYmIHR5cGVvZiB4LnNlcXVlbmNlID09PSBcInN0cmluZ1wiICYmIHR5cGVvZiB4LnRva2VuID09PSBcIm51bWJlclwiICYmIHR5cGVvZiB4LnRva2VuX3N0ciA9PT0gXCJzdHJpbmdcIik7XG4gIGlmICghaXNWYWxpZE91dHB1dCkge1xuICAgIHRocm93IG5ldyBJbmZlcmVuY2VPdXRwdXRFcnJvcihcIkV4cGVjdGVkIEFycmF5PHtzY29yZTogbnVtYmVyLCBzZXF1ZW5jZTogc3RyaW5nLCB0b2tlbjogbnVtYmVyLCB0b2tlbl9zdHI6IHN0cmluZ30+XCIpO1xuICB9XG4gIHJldHVybiByZXM7XG59XG4vLyBzcmMvdGFza3MvbmxwL3F1ZXN0aW9uQW5zd2VyaW5nLnRzXG5hc3luYyBmdW5jdGlvbiBxdWVzdGlvbkFuc3dlcmluZyhhcmdzLCBvcHRpb25zKSB7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IHJlcXVlc3QoYXJncywge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgdGFza0hpbnQ6IFwicXVlc3Rpb24tYW5zd2VyaW5nXCJcbiAgfSk7XG4gIGNvbnN0IGlzVmFsaWRPdXRwdXQgPSB0eXBlb2YgcmVzID09PSBcIm9iamVjdFwiICYmICEhcmVzICYmIHR5cGVvZiByZXMuYW5zd2VyID09PSBcInN0cmluZ1wiICYmIHR5cGVvZiByZXMuZW5kID09PSBcIm51bWJlclwiICYmIHR5cGVvZiByZXMuc2NvcmUgPT09IFwibnVtYmVyXCIgJiYgdHlwZW9mIHJlcy5zdGFydCA9PT0gXCJudW1iZXJcIjtcbiAgaWYgKCFpc1ZhbGlkT3V0cHV0KSB7XG4gICAgdGhyb3cgbmV3IEluZmVyZW5jZU91dHB1dEVycm9yKFwiRXhwZWN0ZWQge2Fuc3dlcjogc3RyaW5nLCBlbmQ6IG51bWJlciwgc2NvcmU6IG51bWJlciwgc3RhcnQ6IG51bWJlcn1cIik7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cbi8vIHNyYy90YXNrcy9ubHAvc2VudGVuY2VTaW1pbGFyaXR5LnRzXG5hc3luYyBmdW5jdGlvbiBzZW50ZW5jZVNpbWlsYXJpdHkoYXJncywgb3B0aW9ucykge1xuICBjb25zdCBkZWZhdWx0VGFzayA9IGFyZ3MubW9kZWwgPyBhd2FpdCBnZXREZWZhdWx0VGFzayhhcmdzLm1vZGVsLCBhcmdzLmFjY2Vzc1Rva2VuLCBvcHRpb25zKSA6IHZvaWQgMDtcbiAgY29uc3QgcmVzID0gYXdhaXQgcmVxdWVzdChhcmdzLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICB0YXNrSGludDogXCJzZW50ZW5jZS1zaW1pbGFyaXR5XCIsXG4gICAgLi4uKGRlZmF1bHRUYXNrID09PSBcImZlYXR1cmUtZXh0cmFjdGlvblwiICYmIHtcbiAgICAgIGZvcmNlVGFzazogXCJzZW50ZW5jZS1zaW1pbGFyaXR5XCJcbiAgICB9KVxuICB9KTtcbiAgY29uc3QgaXNWYWxpZE91dHB1dCA9IEFycmF5LmlzQXJyYXkocmVzKSAmJiByZXMuZXZlcnkoeCA9PiB0eXBlb2YgeCA9PT0gXCJudW1iZXJcIik7XG4gIGlmICghaXNWYWxpZE91dHB1dCkge1xuICAgIHRocm93IG5ldyBJbmZlcmVuY2VPdXRwdXRFcnJvcihcIkV4cGVjdGVkIG51bWJlcltdXCIpO1xuICB9XG4gIHJldHVybiByZXM7XG59XG4vLyBzcmMvdGFza3MvbmxwL3N1bW1hcml6YXRpb24udHNcbmFzeW5jIGZ1bmN0aW9uIHN1bW1hcml6YXRpb24oYXJncywgb3B0aW9ucykge1xuICBjb25zdCByZXMgPSBhd2FpdCByZXF1ZXN0KGFyZ3MsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIHRhc2tIaW50OiBcInN1bW1hcml6YXRpb25cIlxuICB9KTtcbiAgY29uc3QgaXNWYWxpZE91dHB1dCA9IEFycmF5LmlzQXJyYXkocmVzKSAmJiByZXMuZXZlcnkoeCA9PiB0eXBlb2YgeD8uc3VtbWFyeV90ZXh0ID09PSBcInN0cmluZ1wiKTtcbiAgaWYgKCFpc1ZhbGlkT3V0cHV0KSB7XG4gICAgdGhyb3cgbmV3IEluZmVyZW5jZU91dHB1dEVycm9yKFwiRXhwZWN0ZWQgQXJyYXk8e3N1bW1hcnlfdGV4dDogc3RyaW5nfT5cIik7XG4gIH1cbiAgcmV0dXJuIHJlcz8uWzBdO1xufVxuLy8gc3JjL3Rhc2tzL25scC90YWJsZVF1ZXN0aW9uQW5zd2VyaW5nLnRzXG5hc3luYyBmdW5jdGlvbiB0YWJsZVF1ZXN0aW9uQW5zd2VyaW5nKGFyZ3MsIG9wdGlvbnMpIHtcbiAgY29uc3QgcmVzID0gYXdhaXQgcmVxdWVzdChhcmdzLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICB0YXNrSGludDogXCJ0YWJsZS1xdWVzdGlvbi1hbnN3ZXJpbmdcIlxuICB9KTtcbiAgY29uc3QgaXNWYWxpZE91dHB1dCA9IHR5cGVvZiByZXM/LmFnZ3JlZ2F0b3IgPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIHJlcy5hbnN3ZXIgPT09IFwic3RyaW5nXCIgJiYgQXJyYXkuaXNBcnJheShyZXMuY2VsbHMpICYmIHJlcy5jZWxscy5ldmVyeSh4ID0+IHR5cGVvZiB4ID09PSBcInN0cmluZ1wiKSAmJiBBcnJheS5pc0FycmF5KHJlcy5jb29yZGluYXRlcykgJiYgcmVzLmNvb3JkaW5hdGVzLmV2ZXJ5KGNvb3JkID0+IEFycmF5LmlzQXJyYXkoY29vcmQpICYmIGNvb3JkLmV2ZXJ5KHggPT4gdHlwZW9mIHggPT09IFwibnVtYmVyXCIpKTtcbiAgaWYgKCFpc1ZhbGlkT3V0cHV0KSB7XG4gICAgdGhyb3cgbmV3IEluZmVyZW5jZU91dHB1dEVycm9yKFwiRXhwZWN0ZWQge2FnZ3JlZ2F0b3I6IHN0cmluZywgYW5zd2VyOiBzdHJpbmcsIGNlbGxzOiBzdHJpbmdbXSwgY29vcmRpbmF0ZXM6IG51bWJlcltdW119XCIpO1xuICB9XG4gIHJldHVybiByZXM7XG59XG4vLyBzcmMvdGFza3MvbmxwL3RleHRDbGFzc2lmaWNhdGlvbi50c1xuYXN5bmMgZnVuY3Rpb24gdGV4dENsYXNzaWZpY2F0aW9uKGFyZ3MsIG9wdGlvbnMpIHtcbiAgY29uc3QgcmVzID0gKGF3YWl0IHJlcXVlc3QoYXJncywge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgdGFza0hpbnQ6IFwidGV4dC1jbGFzc2lmaWNhdGlvblwiXG4gIH0pKT8uWzBdO1xuICBjb25zdCBpc1ZhbGlkT3V0cHV0ID0gQXJyYXkuaXNBcnJheShyZXMpICYmIHJlcy5ldmVyeSh4ID0+IHR5cGVvZiB4Py5sYWJlbCA9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgeC5zY29yZSA9PT0gXCJudW1iZXJcIik7XG4gIGlmICghaXNWYWxpZE91dHB1dCkge1xuICAgIHRocm93IG5ldyBJbmZlcmVuY2VPdXRwdXRFcnJvcihcIkV4cGVjdGVkIEFycmF5PHtsYWJlbDogc3RyaW5nLCBzY29yZTogbnVtYmVyfT5cIik7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cbi8vIHNyYy91dGlscy90b0FycmF5LnRzXG5mdW5jdGlvbiB0b0FycmF5KG9iaikge1xuICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuICByZXR1cm4gW29ial07XG59XG4vLyBzcmMvdGFza3MvbmxwL3RleHRHZW5lcmF0aW9uLnRzXG5hc3luYyBmdW5jdGlvbiB0ZXh0R2VuZXJhdGlvbihhcmdzLCBvcHRpb25zKSB7XG4gIGNvbnN0IHJlcyA9IHRvQXJyYXkoYXdhaXQgcmVxdWVzdChhcmdzLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICB0YXNrSGludDogXCJ0ZXh0LWdlbmVyYXRpb25cIlxuICB9KSk7XG4gIGNvbnN0IGlzVmFsaWRPdXRwdXQgPSBBcnJheS5pc0FycmF5KHJlcykgJiYgcmVzLmV2ZXJ5KHggPT4gdHlwZW9mIHg/LmdlbmVyYXRlZF90ZXh0ID09PSBcInN0cmluZ1wiKTtcbiAgaWYgKCFpc1ZhbGlkT3V0cHV0KSB7XG4gICAgdGhyb3cgbmV3IEluZmVyZW5jZU91dHB1dEVycm9yKFwiRXhwZWN0ZWQgQXJyYXk8e2dlbmVyYXRlZF90ZXh0OiBzdHJpbmd9PlwiKTtcbiAgfVxuICByZXR1cm4gcmVzPy5bMF07XG59XG4vLyBzcmMvdGFza3MvbmxwL3RleHRHZW5lcmF0aW9uU3RyZWFtLnRzXG5hc3luYyBmdW5jdGlvbiogdGV4dEdlbmVyYXRpb25TdHJlYW0oYXJncywgb3B0aW9ucykge1xuICB5aWVsZCogc3RyZWFtaW5nUmVxdWVzdChhcmdzLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICB0YXNrSGludDogXCJ0ZXh0LWdlbmVyYXRpb25cIlxuICB9KTtcbn1cbi8vIHNyYy90YXNrcy9ubHAvdG9rZW5DbGFzc2lmaWNhdGlvbi50c1xuYXN5bmMgZnVuY3Rpb24gdG9rZW5DbGFzc2lmaWNhdGlvbihhcmdzLCBvcHRpb25zKSB7XG4gIGNvbnN0IHJlcyA9IHRvQXJyYXkoYXdhaXQgcmVxdWVzdChhcmdzLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICB0YXNrSGludDogXCJ0b2tlbi1jbGFzc2lmaWNhdGlvblwiXG4gIH0pKTtcbiAgY29uc3QgaXNWYWxpZE91dHB1dCA9IEFycmF5LmlzQXJyYXkocmVzKSAmJiByZXMuZXZlcnkoeCA9PiB0eXBlb2YgeC5lbmQgPT09IFwibnVtYmVyXCIgJiYgdHlwZW9mIHguZW50aXR5X2dyb3VwID09PSBcInN0cmluZ1wiICYmIHR5cGVvZiB4LnNjb3JlID09PSBcIm51bWJlclwiICYmIHR5cGVvZiB4LnN0YXJ0ID09PSBcIm51bWJlclwiICYmIHR5cGVvZiB4LndvcmQgPT09IFwic3RyaW5nXCIpO1xuICBpZiAoIWlzVmFsaWRPdXRwdXQpIHtcbiAgICB0aHJvdyBuZXcgSW5mZXJlbmNlT3V0cHV0RXJyb3IoXCJFeHBlY3RlZCBBcnJheTx7ZW5kOiBudW1iZXIsIGVudGl0eV9ncm91cDogc3RyaW5nLCBzY29yZTogbnVtYmVyLCBzdGFydDogbnVtYmVyLCB3b3JkOiBzdHJpbmd9PlwiKTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuLy8gc3JjL3Rhc2tzL25scC90cmFuc2xhdGlvbi50c1xuYXN5bmMgZnVuY3Rpb24gdHJhbnNsYXRpb24oYXJncywgb3B0aW9ucykge1xuICBjb25zdCByZXMgPSBhd2FpdCByZXF1ZXN0KGFyZ3MsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIHRhc2tIaW50OiBcInRyYW5zbGF0aW9uXCJcbiAgfSk7XG4gIGNvbnN0IGlzVmFsaWRPdXRwdXQgPSBBcnJheS5pc0FycmF5KHJlcykgJiYgcmVzLmV2ZXJ5KHggPT4gdHlwZW9mIHg/LnRyYW5zbGF0aW9uX3RleHQgPT09IFwic3RyaW5nXCIpO1xuICBpZiAoIWlzVmFsaWRPdXRwdXQpIHtcbiAgICB0aHJvdyBuZXcgSW5mZXJlbmNlT3V0cHV0RXJyb3IoXCJFeHBlY3RlZCB0eXBlIEFycmF5PHt0cmFuc2xhdGlvbl90ZXh0OiBzdHJpbmd9PlwiKTtcbiAgfVxuICByZXR1cm4gcmVzPy5sZW5ndGggPT09IDEgPyByZXM/LlswXSA6IHJlcztcbn1cbi8vIHNyYy90YXNrcy9ubHAvemVyb1Nob3RDbGFzc2lmaWNhdGlvbi50c1xuYXN5bmMgZnVuY3Rpb24gemVyb1Nob3RDbGFzc2lmaWNhdGlvbihhcmdzLCBvcHRpb25zKSB7XG4gIGNvbnN0IHJlcyA9IHRvQXJyYXkoYXdhaXQgcmVxdWVzdChhcmdzLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICB0YXNrSGludDogXCJ6ZXJvLXNob3QtY2xhc3NpZmljYXRpb25cIlxuICB9KSk7XG4gIGNvbnN0IGlzVmFsaWRPdXRwdXQgPSBBcnJheS5pc0FycmF5KHJlcykgJiYgcmVzLmV2ZXJ5KHggPT4gQXJyYXkuaXNBcnJheSh4LmxhYmVscykgJiYgeC5sYWJlbHMuZXZlcnkoX2xhYmVsID0+IHR5cGVvZiBfbGFiZWwgPT09IFwic3RyaW5nXCIpICYmIEFycmF5LmlzQXJyYXkoeC5zY29yZXMpICYmIHguc2NvcmVzLmV2ZXJ5KF9zY29yZSA9PiB0eXBlb2YgX3Njb3JlID09PSBcIm51bWJlclwiKSAmJiB0eXBlb2YgeC5zZXF1ZW5jZSA9PT0gXCJzdHJpbmdcIik7XG4gIGlmICghaXNWYWxpZE91dHB1dCkge1xuICAgIHRocm93IG5ldyBJbmZlcmVuY2VPdXRwdXRFcnJvcihcIkV4cGVjdGVkIEFycmF5PHtsYWJlbHM6IHN0cmluZ1tdLCBzY29yZXM6IG51bWJlcltdLCBzZXF1ZW5jZTogc3RyaW5nfT5cIik7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cbi8vIHNyYy90YXNrcy9ubHAvY2hhdENvbXBsZXRpb24udHNcbmFzeW5jIGZ1bmN0aW9uIGNoYXRDb21wbGV0aW9uKGFyZ3MsIG9wdGlvbnMpIHtcbiAgY29uc3QgcmVzID0gYXdhaXQgcmVxdWVzdChhcmdzLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICB0YXNrSGludDogXCJ0ZXh0LWdlbmVyYXRpb25cIixcbiAgICBjaGF0Q29tcGxldGlvbjogdHJ1ZVxuICB9KTtcbiAgY29uc3QgaXNWYWxpZE91dHB1dCA9IHR5cGVvZiByZXMgPT09IFwib2JqZWN0XCIgJiYgQXJyYXkuaXNBcnJheShyZXM/LmNob2ljZXMpICYmIHR5cGVvZiByZXM/LmNyZWF0ZWQgPT09IFwibnVtYmVyXCIgJiYgdHlwZW9mIHJlcz8uaWQgPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIHJlcz8ubW9kZWwgPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIHJlcz8uc3lzdGVtX2ZpbmdlcnByaW50ID09PSBcInN0cmluZ1wiICYmIHR5cGVvZiByZXM/LnVzYWdlID09PSBcIm9iamVjdFwiO1xuICBpZiAoIWlzVmFsaWRPdXRwdXQpIHtcbiAgICB0aHJvdyBuZXcgSW5mZXJlbmNlT3V0cHV0RXJyb3IoXCJFeHBlY3RlZCBDaGF0Q29tcGxldGlvbk91dHB1dFwiKTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuLy8gc3JjL3Rhc2tzL25scC9jaGF0Q29tcGxldGlvblN0cmVhbS50c1xuYXN5bmMgZnVuY3Rpb24qIGNoYXRDb21wbGV0aW9uU3RyZWFtKGFyZ3MsIG9wdGlvbnMpIHtcbiAgeWllbGQqIHN0cmVhbWluZ1JlcXVlc3QoYXJncywge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgdGFza0hpbnQ6IFwidGV4dC1nZW5lcmF0aW9uXCIsXG4gICAgY2hhdENvbXBsZXRpb246IHRydWVcbiAgfSk7XG59XG4vLyBzcmMvdGFza3MvbXVsdGltb2RhbC9kb2N1bWVudFF1ZXN0aW9uQW5zd2VyaW5nLnRzXG5hc3luYyBmdW5jdGlvbiBkb2N1bWVudFF1ZXN0aW9uQW5zd2VyaW5nKGFyZ3MsIG9wdGlvbnMpIHtcbiAgY29uc3QgcmVxQXJncyA9IHtcbiAgICAuLi5hcmdzLFxuICAgIGlucHV0czoge1xuICAgICAgcXVlc3Rpb246IGFyZ3MuaW5wdXRzLnF1ZXN0aW9uLFxuICAgICAgLy8gY29udmVydCBCbG9iIG9yIEFycmF5QnVmZmVyIHRvIGJhc2U2NFxuICAgICAgaW1hZ2U6IGJhc2U2NEZyb21CeXRlcyhuZXcgVWludDhBcnJheShhcmdzLmlucHV0cy5pbWFnZSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyID8gYXJncy5pbnB1dHMuaW1hZ2UgOiBhd2FpdCBhcmdzLmlucHV0cy5pbWFnZS5hcnJheUJ1ZmZlcigpKSlcbiAgICB9XG4gIH07XG4gIGNvbnN0IHJlcyA9IHRvQXJyYXkoYXdhaXQgcmVxdWVzdChyZXFBcmdzLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICB0YXNrSGludDogXCJkb2N1bWVudC1xdWVzdGlvbi1hbnN3ZXJpbmdcIlxuICB9KSk/LlswXTtcbiAgY29uc3QgaXNWYWxpZE91dHB1dCA9IHR5cGVvZiByZXM/LmFuc3dlciA9PT0gXCJzdHJpbmdcIiAmJiAodHlwZW9mIHJlcy5lbmQgPT09IFwibnVtYmVyXCIgfHwgdHlwZW9mIHJlcy5lbmQgPT09IFwidW5kZWZpbmVkXCIpICYmICh0eXBlb2YgcmVzLnNjb3JlID09PSBcIm51bWJlclwiIHx8IHR5cGVvZiByZXMuc2NvcmUgPT09IFwidW5kZWZpbmVkXCIpICYmICh0eXBlb2YgcmVzLnN0YXJ0ID09PSBcIm51bWJlclwiIHx8IHR5cGVvZiByZXMuc3RhcnQgPT09IFwidW5kZWZpbmVkXCIpO1xuICBpZiAoIWlzVmFsaWRPdXRwdXQpIHtcbiAgICB0aHJvdyBuZXcgSW5mZXJlbmNlT3V0cHV0RXJyb3IoXCJFeHBlY3RlZCBBcnJheTx7YW5zd2VyOiBzdHJpbmcsIGVuZD86IG51bWJlciwgc2NvcmU/OiBudW1iZXIsIHN0YXJ0PzogbnVtYmVyfT5cIik7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cbi8vIHNyYy90YXNrcy9tdWx0aW1vZGFsL3Zpc3VhbFF1ZXN0aW9uQW5zd2VyaW5nLnRzXG5hc3luYyBmdW5jdGlvbiB2aXN1YWxRdWVzdGlvbkFuc3dlcmluZyhhcmdzLCBvcHRpb25zKSB7XG4gIGNvbnN0IHJlcUFyZ3MgPSB7XG4gICAgLi4uYXJncyxcbiAgICBpbnB1dHM6IHtcbiAgICAgIHF1ZXN0aW9uOiBhcmdzLmlucHV0cy5xdWVzdGlvbixcbiAgICAgIC8vIGNvbnZlcnQgQmxvYiBvciBBcnJheUJ1ZmZlciB0byBiYXNlNjRcbiAgICAgIGltYWdlOiBiYXNlNjRGcm9tQnl0ZXMobmV3IFVpbnQ4QXJyYXkoYXJncy5pbnB1dHMuaW1hZ2UgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlciA/IGFyZ3MuaW5wdXRzLmltYWdlIDogYXdhaXQgYXJncy5pbnB1dHMuaW1hZ2UuYXJyYXlCdWZmZXIoKSkpXG4gICAgfVxuICB9O1xuICBjb25zdCByZXMgPSAoYXdhaXQgcmVxdWVzdChyZXFBcmdzLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICB0YXNrSGludDogXCJ2aXN1YWwtcXVlc3Rpb24tYW5zd2VyaW5nXCJcbiAgfSkpPy5bMF07XG4gIGNvbnN0IGlzVmFsaWRPdXRwdXQgPSB0eXBlb2YgcmVzPy5hbnN3ZXIgPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIHJlcy5zY29yZSA9PT0gXCJudW1iZXJcIjtcbiAgaWYgKCFpc1ZhbGlkT3V0cHV0KSB7XG4gICAgdGhyb3cgbmV3IEluZmVyZW5jZU91dHB1dEVycm9yKFwiRXhwZWN0ZWQgQXJyYXk8e2Fuc3dlcjogc3RyaW5nLCBzY29yZTogbnVtYmVyfT5cIik7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cbi8vIHNyYy90YXNrcy90YWJ1bGFyL3RhYnVsYXJSZWdyZXNzaW9uLnRzXG5hc3luYyBmdW5jdGlvbiB0YWJ1bGFyUmVncmVzc2lvbihhcmdzLCBvcHRpb25zKSB7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IHJlcXVlc3QoYXJncywge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgdGFza0hpbnQ6IFwidGFidWxhci1yZWdyZXNzaW9uXCJcbiAgfSk7XG4gIGNvbnN0IGlzVmFsaWRPdXRwdXQgPSBBcnJheS5pc0FycmF5KHJlcykgJiYgcmVzLmV2ZXJ5KHggPT4gdHlwZW9mIHggPT09IFwibnVtYmVyXCIpO1xuICBpZiAoIWlzVmFsaWRPdXRwdXQpIHtcbiAgICB0aHJvdyBuZXcgSW5mZXJlbmNlT3V0cHV0RXJyb3IoXCJFeHBlY3RlZCBudW1iZXJbXVwiKTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuLy8gc3JjL3Rhc2tzL3RhYnVsYXIvdGFidWxhckNsYXNzaWZpY2F0aW9uLnRzXG5hc3luYyBmdW5jdGlvbiB0YWJ1bGFyQ2xhc3NpZmljYXRpb24oYXJncywgb3B0aW9ucykge1xuICBjb25zdCByZXMgPSBhd2FpdCByZXF1ZXN0KGFyZ3MsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIHRhc2tIaW50OiBcInRhYnVsYXItY2xhc3NpZmljYXRpb25cIlxuICB9KTtcbiAgY29uc3QgaXNWYWxpZE91dHB1dCA9IEFycmF5LmlzQXJyYXkocmVzKSAmJiByZXMuZXZlcnkoeCA9PiB0eXBlb2YgeCA9PT0gXCJudW1iZXJcIik7XG4gIGlmICghaXNWYWxpZE91dHB1dCkge1xuICAgIHRocm93IG5ldyBJbmZlcmVuY2VPdXRwdXRFcnJvcihcIkV4cGVjdGVkIG51bWJlcltdXCIpO1xuICB9XG4gIHJldHVybiByZXM7XG59XG4vLyBzcmMvSGZJbmZlcmVuY2UudHNcbnZhciBIZkluZmVyZW5jZSA9IGNsYXNzIHtcbiAgYWNjZXNzVG9rZW47XG4gIGRlZmF1bHRPcHRpb25zO1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBsZXQgYWNjZXNzVG9rZW4gPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IFwiXCI7XG4gICAgbGV0IGRlZmF1bHRPcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICB0aGlzLmFjY2Vzc1Rva2VuID0gYWNjZXNzVG9rZW47XG4gICAgdGhpcy5kZWZhdWx0T3B0aW9ucyA9IGRlZmF1bHRPcHRpb25zO1xuICAgIGZvciAoY29uc3QgW25hbWUsIGZuXSBvZiBPYmplY3QuZW50cmllcyh0YXNrc19leHBvcnRzKSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIG5hbWUsIHtcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHZhbHVlOiAocGFyYW1zLCBvcHRpb25zKSA9PlxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICBmbih7XG4gICAgICAgICAgLi4ucGFyYW1zLFxuICAgICAgICAgIGFjY2Vzc1Rva2VuXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAuLi5kZWZhdWx0T3B0aW9ucyxcbiAgICAgICAgICAuLi5vcHRpb25zXG4gICAgICAgIH0pXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIFJldHVybnMgY29weSBvZiBIZkluZmVyZW5jZSB0aWVkIHRvIGEgc3BlY2lmaWVkIGVuZHBvaW50LlxuICAgKi9cbiAgZW5kcG9pbnQoZW5kcG9pbnRVcmwpIHtcbiAgICByZXR1cm4gbmV3IEhmSW5mZXJlbmNlRW5kcG9pbnQoZW5kcG9pbnRVcmwsIHRoaXMuYWNjZXNzVG9rZW4sIHRoaXMuZGVmYXVsdE9wdGlvbnMpO1xuICB9XG59O1xudmFyIEhmSW5mZXJlbmNlRW5kcG9pbnQgPSBjbGFzcyB7XG4gIGNvbnN0cnVjdG9yKGVuZHBvaW50VXJsKSB7XG4gICAgbGV0IGFjY2Vzc1Rva2VuID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBcIlwiO1xuICAgIGxldCBkZWZhdWx0T3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDoge307XG4gICAgYWNjZXNzVG9rZW47XG4gICAgZGVmYXVsdE9wdGlvbnM7XG4gICAgZm9yIChjb25zdCBbbmFtZSwgZm5dIG9mIE9iamVjdC5lbnRyaWVzKHRhc2tzX2V4cG9ydHMpKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgbmFtZSwge1xuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgdmFsdWU6IChwYXJhbXMsIG9wdGlvbnMpID0+XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgIGZuKHtcbiAgICAgICAgICAuLi5wYXJhbXMsXG4gICAgICAgICAgYWNjZXNzVG9rZW4sXG4gICAgICAgICAgZW5kcG9pbnRVcmxcbiAgICAgICAgfSwge1xuICAgICAgICAgIC4uLmRlZmF1bHRPcHRpb25zLFxuICAgICAgICAgIC4uLm9wdGlvbnNcbiAgICAgICAgfSlcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufTtcbmV4cG9ydCB7IEhmSW5mZXJlbmNlLCBIZkluZmVyZW5jZUVuZHBvaW50LCBJbmZlcmVuY2VPdXRwdXRFcnJvciwgYXVkaW9DbGFzc2lmaWNhdGlvbiwgYXVkaW9Ub0F1ZGlvLCBhdXRvbWF0aWNTcGVlY2hSZWNvZ25pdGlvbiwgY2hhdENvbXBsZXRpb24sIGNoYXRDb21wbGV0aW9uU3RyZWFtLCBkb2N1bWVudFF1ZXN0aW9uQW5zd2VyaW5nLCBmZWF0dXJlRXh0cmFjdGlvbiwgZmlsbE1hc2ssIGltYWdlQ2xhc3NpZmljYXRpb24sIGltYWdlU2VnbWVudGF0aW9uLCBpbWFnZVRvSW1hZ2UsIGltYWdlVG9UZXh0LCBvYmplY3REZXRlY3Rpb24sIHF1ZXN0aW9uQW5zd2VyaW5nLCByZXF1ZXN0LCBzZW50ZW5jZVNpbWlsYXJpdHksIHN0cmVhbWluZ1JlcXVlc3QsIHN1bW1hcml6YXRpb24sIHRhYmxlUXVlc3Rpb25BbnN3ZXJpbmcsIHRhYnVsYXJDbGFzc2lmaWNhdGlvbiwgdGFidWxhclJlZ3Jlc3Npb24sIHRleHRDbGFzc2lmaWNhdGlvbiwgdGV4dEdlbmVyYXRpb24sIHRleHRHZW5lcmF0aW9uU3RyZWFtLCB0ZXh0VG9JbWFnZSwgdGV4dFRvU3BlZWNoLCB0b2tlbkNsYXNzaWZpY2F0aW9uLCB0cmFuc2xhdGlvbiwgdmlzdWFsUXVlc3Rpb25BbnN3ZXJpbmcsIHplcm9TaG90Q2xhc3NpZmljYXRpb24sIHplcm9TaG90SW1hZ2VDbGFzc2lmaWNhdGlvbiB9OyIsImltcG9ydCAnLi9jb21tb24nO1xuaW1wb3J0ICcuLi9tb2R1bGVzL292ZXJsYXkvYmFja2dyb3VuZCc7XG5pbXBvcnQgJy4uL21vZHVsZXMvaHVnZ2luZ2ZhY2UvYmFja2dyb3VuZCc7XG4vLyBpbXBvcnQgJy4uL21vZHVsZXMvbmV0d29yay9iYWNrZ3JvdW5kJzsiLCJpbXBvcnQgeyBvblJ1bnRpbWVNZXNzYWdlIH0gZnJvbSAnLi4vdXRpbHMnO1xuLy8gY2hyb21lLnRhYnMub25VcGRhdGVkLmFkZExpc3RlbmVyKCh0YWIpID0+IHtcbi8vICAgICBjb25zb2xlLmxvZygnY3JlYXRlIHRhYicsIHRhYi5pZClcbi8vICAgICBzZW5kVGFiTWVzc2FnZSh0YWIuaWQhLCBbdGFiLmlkIV0pO1xuLy8gfSk7XG5vblJ1bnRpbWVNZXNzYWdlKCd0YWJJbmZvJywgKGRhdGEsIHNlbmRlciwgcmVzcG9uc2UpID0+IHtcbiAgcmVzcG9uc2Uoc2VuZGVyLnRhYj8uaWQpO1xufSk7XG4vLyBvblJ1bnRpbWVNZXNzYWdlKCdleGVjU2NyaXB0JywgKFtzY3JpcHQsIFZPXSwgc2VuZGVyLCByZXNwb25zZSkgPT4ge1xuLy8gICAgIGV2YWxTY3JpcHRJblRhYihzZW5kZXIudGFiPy5pZCEsIHNjcmlwdCwgVk8pO1xuLy8gfSk7IiwiaW1wb3J0IHsgb25SdW50aW1lTWVzc2FnZSB9IGZyb20gJy4uLy4uL3V0aWxzJztcbmltcG9ydCB7IEhmSW5mZXJlbmNlIH0gZnJvbSAnQGh1Z2dpbmdmYWNlL2luZmVyZW5jZSc7XG5jb25zdCBIRl9UT0tFTiA9ICdoZl9DWmJJQlJZSEljUk51Q2dQcXlrcEVYT1lyeEFVVFJDVXVLJztcbmNvbnN0IGluZmVyZW5jZSA9IG5ldyBIZkluZmVyZW5jZShIRl9UT0tFTik7XG5sZXQgbGFzdFJlc3VsdCA9IHVuZGVmaW5lZDtcbm9uUnVudGltZU1lc3NhZ2UoJ3F1ZXJ5SHVnZ2luZ0ZhY2UnLCBhc3luYyAoZGF0YSwgc2VuZGVyLCByZXNwb25zZSkgPT4ge1xuICBjb25zdCBbYXBpLCBwYXJhbXNdID0gZGF0YTtcbiAgY29uc29sZS5sb2coYHNlbmQgSHVnZ2luZ0ZhY2U6ICR7YXBpfWApO1xuICBjb25zdCByZXN1bHQgPSBhd2FpdCBpbmZlcmVuY2VbYXBpXShwYXJhbXMpO1xuICBsYXN0UmVzdWx0ID0ge1xuICAgIGFwaSxcbiAgICBwYXJhbXMsXG4gICAgcmVzdWx0XG4gIH07XG4gIHJlc3BvbnNlKGxhc3RSZXN1bHQpO1xufSk7XG5vblJ1bnRpbWVNZXNzYWdlKCdnZXRMYXN0SHVnZ2luZ0ZhY2VEYXRhJywgYXN5bmMgKGRhdGEsIHNlbmRlciwgcmVzcG9uc2UpID0+IHtcbiAgcmVzcG9uc2UobGFzdFJlc3VsdCk7XG59KTtcbmNvbnNvbGUubG9nKCdIdWdnaW5nRmFjZSBtb2R1bGUgbG9hZGVkJyk7IiwiaW1wb3J0IHsgb25SdW50aW1lTWVzc2FnZSwgc2VuZFRhYk1lc3NhZ2UgfSBmcm9tICcuLi8uLi91dGlscyc7XG4vLyDlrZjlhoXlrZjjgILlhbPmtY/op4jlmajkuKJcbmNvbnN0IG92ZXJsYXlNYXAgPSBuZXcgTWFwKCk7XG5jb25zb2xlLmxvZygnY2FwdHVyZSBiYWNrZ3JvdW5kIHJlYWR5Jywgb3ZlcmxheU1hcCk7XG5vblJ1bnRpbWVNZXNzYWdlKCdzZXRPdmVybGF5Q2FwdHVyZScsIChkYXRhLCBzZW5kZXIsIHJlc3BvbnNlKSA9PiB7XG4gIGxldCBbY3VycmVudFRhYklkLCBjYXB0dXJlRGF0YV0gPSBkYXRhO1xuICAvLyBjb25zb2xlLmxvZygnc2V0T3ZlcmxheUNhcHR1cmUnLCBjdXJyZW50VGFiSWQpO1xuICAvLyDnqbrnmoRiYXNlNjTmmK8gZGF0YTosXG4gIGlmICghY2FwdHVyZURhdGE/LmJhc2U2NCB8fCBjYXB0dXJlRGF0YS5iYXNlNjQubGVuZ3RoIDwgMTApIHtcbiAgICBvdmVybGF5TWFwLmRlbGV0ZShjdXJyZW50VGFiSWQpO1xuICB9IGVsc2Uge1xuICAgIG92ZXJsYXlNYXAuc2V0KGN1cnJlbnRUYWJJZCwgY2FwdHVyZURhdGEpO1xuICAgIHJlc3BvbnNlKCk7XG4gIH1cbiAgLy8gY29uc29sZS5sb2coJ3NlbmRUYWJNZXNzYWdlIHVwZGF0ZU92ZXJsYXlDYXB0dXJlJywgY3VycmVudFRhYklkLCBvdmVybGF5TWFwLmdldChjdXJyZW50VGFiSWQpKTtcbiAgaWYgKG5ldyBVUkwoc2VuZGVyLm9yaWdpbiA/PyAnJykucHJvdG9jb2wgPT09ICdjaHJvbWUtZXh0ZW5zaW9uOicpIHtcbiAgICBzZW5kVGFiTWVzc2FnZSgndXBkYXRlT3ZlcmxheUNhcHR1cmUnLCBjdXJyZW50VGFiSWQsIFtvdmVybGF5TWFwLmdldChjdXJyZW50VGFiSWQpXSk7XG4gIH1cbn0pO1xub25SdW50aW1lTWVzc2FnZSgnZ2V0T3ZlcmxheUNhcHR1cmUnLCAoZGF0YSwgc2VuZGVyLCByZXNwb25zZSkgPT4ge1xuICBsZXQgW2N1cnJlbnRUYWJJZF0gPSBkYXRhO1xuICBjb25zdCBjYXB0dXJlRGF0YSA9IG92ZXJsYXlNYXAuZ2V0KGN1cnJlbnRUYWJJZCk7XG4gIHJlc3BvbnNlKGNhcHR1cmVEYXRhKTtcbn0pOyIsImltcG9ydCB7ICQgfSBmcm9tICcuL3Rvb2xzJztcbi8vIHRhYnMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTZWxlY3RlZCgpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKHJlcyA9PiB7XG4gICAgLy8gY2hyb21lLnRhYnMuZ2V0U2VsZWN0ZWQoZnVuY3Rpb24gKHRhYikge1xuICAgIC8vICAgICByZXModGFiKTtcbiAgICAvLyB9KTtcbiAgICBjaHJvbWUudGFicy5xdWVyeSh7XG4gICAgICBjdXJyZW50V2luZG93OiB0cnVlLFxuICAgICAgYWN0aXZlOiB0cnVlXG4gICAgfSwgZnVuY3Rpb24gKHRhYnMpIHtcbiAgICAgIHJlcyh0YWJzWzBdKTtcbiAgICB9KTtcbiAgfSk7XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Q3VycmVudFRhYigpIHtcbiAgLy8gcmV0dXJuIGNocm9tZS50YWJzLmdldEN1cnJlbnQoKTtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKHJlcyA9PiB7XG4gICAgLy8gY2hyb21lLnRhYnMuZ2V0U2VsZWN0ZWQoZnVuY3Rpb24gKHRhYikge1xuICAgIC8vICAgICByZXModGFiKTtcbiAgICAvLyB9KTtcbiAgICBjaHJvbWUudGFicy5xdWVyeSh7XG4gICAgICBjdXJyZW50V2luZG93OiB0cnVlLFxuICAgICAgYWN0aXZlOiB0cnVlXG4gICAgfSwgZnVuY3Rpb24gKHRhYnMpIHtcbiAgICAgIHJlcyh0YWJzWzBdKTtcbiAgICB9KTtcbiAgfSk7XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VGFiKHRhYklkKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgICBjaHJvbWUudGFicy5nZXQodGFiSWQsIHRhYiA9PiB7XG4gICAgICByZXModGFiKTtcbiAgICB9KTtcbiAgfSk7XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0QWxsVGFicygpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKHJlcyA9PiB7XG4gICAgY2hyb21lLnRhYnMucXVlcnkoe30sIHRhYnMgPT4ge1xuICAgICAgcmVzKHRhYnMpO1xuICAgIH0pO1xuICB9KTtcbn1cbi8vIG1lc3NhZ2UgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIGV4cG9ydCBmdW5jdGlvbiBzZW5kVG9Db250ZW50KG1lc3NhZ2U6IHN0cmluZywgY2FsbGJhY2s6IENvbW1vbkNhbGxiYWNrKSB7XG4vLyAgICAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSwgZnVuY3Rpb24gKHRhYnMpIHtcbi8vICAgICAgICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UodGFic1swXSEuaWQhLCBtZXNzYWdlLCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbi8vICAgICAgICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2socmVzcG9uc2UpO1xuLy8gICAgICAgICB9KTtcbi8vICAgICB9KTtcbi8vIH1cbi8vIGV4cG9ydCBmdW5jdGlvbiBjb250ZW50T25NZXNzYWdlKGNhbGxiYWNrOiBDb21tb25DYWxsYmFjaykge1xuLy8gICAgIGNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbiAocmVxdWVzdCwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIHtcbi8vICAgICAgICAgaWYgKHNlbmRlci50YWIpIHtcbi8vICAgICAgICAgICAgIHJldHVybjtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhyZXF1ZXN0KTtcbi8vICAgICB9KTtcbi8vIH1cbi8vIHBvcHVwID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5leHBvcnQgY29uc3QgcG9wdXBNYXhXaWR0aCA9IDUwMDtcbmV4cG9ydCBjb25zdCBwb3B1cE1heEhlaWdodCA9IDYwMDtcbmV4cG9ydCBjb25zdCBwb3B1cE1pbldpZHRoID0gMjAwO1xuZXhwb3J0IGZ1bmN0aW9uIHNldEJvZHlTaXplKG1heFdpZHRoLCBtYXhIZWlnaHQpIHtcbiAgJCgnI21haW4nKS5zdHlsZS53aWR0aCA9IGAke21heFdpZHRoID8gcG9wdXBNYXhXaWR0aCA6IHBvcHVwTWluV2lkdGh9cHhgO1xuICBpZiAodHlwZW9mIG1heEhlaWdodCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgJCgnI21haW4nKS5zdHlsZS5oZWlnaHQgPSBtYXhIZWlnaHQgPyBgJHtwb3B1cE1heEhlaWdodH1weGAgOiAnJztcbiAgfVxufVxuLy8gZW52ID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5leHBvcnQgdmFyIEV4ZWNFbnY7XG4oZnVuY3Rpb24gKEV4ZWNFbnYpIHtcbiAgRXhlY0VudltFeGVjRW52W1wiQmFja2dyb3VuZFwiXSA9IDBdID0gXCJCYWNrZ3JvdW5kXCI7XG4gIEV4ZWNFbnZbRXhlY0VudltcIlBvcHVwXCJdID0gMV0gPSBcIlBvcHVwXCI7XG4gIEV4ZWNFbnZbRXhlY0VudltcIkNvbnRlbnRcIl0gPSAyXSA9IFwiQ29udGVudFwiO1xufSkoRXhlY0VudiB8fCAoRXhlY0VudiA9IHt9KSk7XG5mdW5jdGlvbiBnZXRDdXJyZW50RW52KCkge1xuICBpZiAoIWNocm9tZS5leHRlbnNpb24uZ2V0QmFja2dyb3VuZFBhZ2UpIHtcbiAgICByZXR1cm4gRXhlY0Vudi5Db250ZW50O1xuICB9XG4gIGlmIChjaHJvbWUuZXh0ZW5zaW9uLmdldEJhY2tncm91bmRQYWdlKCkgPT09IHdpbmRvdykge1xuICAgIHJldHVybiBFeGVjRW52LkJhY2tncm91bmQ7XG4gIH1cbiAgcmV0dXJuIEV4ZWNFbnYuUG9wdXA7XG59XG5leHBvcnQgY29uc3QgY3VycmVudEVudiA9IGdldEN1cnJlbnRFbnYoKTtcbmV4cG9ydCBmdW5jdGlvbiBldmFsU2NyaXB0SW5UYWIodGFiSWQsIHNjcmlwdCkge1xuICBsZXQgdmFyT2JqID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiB7fTtcbiAgY29uc3QgdmFyTmFtZXMgPSBbXTtcbiAgY29uc3QgdmFyRGF0YSA9IFtdO1xuICBPYmplY3QuZW50cmllcyh2YXJPYmopLmZvckVhY2goX3JlZiA9PiB7XG4gICAgbGV0IFtuYW1lLCBkYXRhXSA9IF9yZWY7XG4gICAgdmFyTmFtZXMucHVzaChuYW1lKTtcbiAgICB2YXJEYXRhLnB1c2goZGF0YSk7XG4gIH0pO1xuICBjaHJvbWUuc2NyaXB0aW5nLmV4ZWN1dGVTY3JpcHQoe1xuICAgIHRhcmdldDoge1xuICAgICAgdGFiSWRcbiAgICB9LFxuICAgIGFyZ3M6IFtzY3JpcHQsIHZhck5hbWVzLCB2YXJEYXRhXSxcbiAgICBmdW5jOiBmdW5jdGlvbiAoc2NyaXB0KSB7XG4gICAgICBsZXQgdmFyTmFtZXMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IFtdO1xuICAgICAgbGV0IHZhckRhdGEgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IFtdO1xuICAgICAgY29uc29sZS5sb2coJ2VlZWU9PT09PScsIHNjcmlwdCwgdmFyTmFtZXMsIHZhckRhdGEpO1xuICAgICAgcmV0dXJuIEZ1bmN0aW9uKC4uLnZhck5hbWVzLCBgXCJ1c2Ugc3RyaWN0XCI7JHtzY3JpcHR9YCkoLi4udmFyRGF0YSk7XG4gICAgfVxuICB9KTtcbn0iLCJleHBvcnQgZnVuY3Rpb24gYmluZERyYWdnZXIobm9kZSwgc3RhcnRYR2V0dGVyLCBzdGFydFlHZXR0ZXIsIG9uVXBkYXRlKSB7XG4gIGxldCBkcmFnZ2luZyA9IGZhbHNlO1xuICBsZXQgc3RhcnRYID0gMDtcbiAgbGV0IHN0YXJ0WSA9IDA7XG4gIGxldCBvZmZzZXRYID0gMDtcbiAgbGV0IG9mZnNldFkgPSAwO1xuICBub2RlLmRyYWdnYWJsZSA9IGZhbHNlO1xuICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGUgPT4ge1xuICAgIGlmICghbm9kZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFnZ2luZyA9IHRydWU7XG4gICAgc3RhcnRYID0gc3RhcnRYR2V0dGVyKCk7XG4gICAgc3RhcnRZID0gc3RhcnRZR2V0dGVyKCk7XG4gICAgb2Zmc2V0WCA9IGUucGFnZVg7XG4gICAgb2Zmc2V0WSA9IGUucGFnZVk7XG4gIH0pO1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZSA9PiB7XG4gICAgaWYgKCFub2RlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghZHJhZ2dpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgb25VcGRhdGUoZS5wYWdlWCAtIG9mZnNldFggKyBzdGFydFgsIGUucGFnZVkgLSBvZmZzZXRZICsgc3RhcnRZKTtcbiAgfSk7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZSA9PiB7XG4gICAgaWYgKCFub2RlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghZHJhZ2dpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhZ2dpbmcgPSBmYWxzZTtcbiAgfSk7XG59IiwiZXhwb3J0ICogZnJvbSAnLi9tZXNzYWdlJztcbmV4cG9ydCAqIGZyb20gJy4vZHJhZ2dlcic7XG5leHBvcnQgKiBmcm9tICcuL3N0b3JhZ2UnO1xuZXhwb3J0ICogZnJvbSAnLi9jaHJvbWUnO1xuZXhwb3J0ICogZnJvbSAnLi90b29scyc7XG4vLyBlZGl0b3Ig5Y2V54us5byVIiwiZXhwb3J0IGZ1bmN0aW9uIG9uUnVudGltZU1lc3NhZ2UoY2hhbm5lbCwgY2FsbGJhY2spIHtcbiAgY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGZ1bmN0aW9uIChyZXF1ZXN0LCBzZW5kZXIsIHJlc3BvbnNlKSB7XG4gICAgaWYgKHJlcXVlc3QuY2hhbm5lbCAhPT0gY2hhbm5lbCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY2FsbGJhY2socmVxdWVzdC5kYXRhLCBzZW5kZXIsIHJlc3BvbnNlKTtcbiAgICB9LCAxKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSk7XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VuZFJ1bnRpbWVNZXNzYWdlKGNoYW5uZWwsIGRhdGEsIG9uUmVzcG9uc2UpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKHJlcyA9PiB7XG4gICAgaWYgKG9uUmVzcG9uc2UpIHtcbiAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICAgICAgY2hhbm5lbCxcbiAgICAgICAgZGF0YVxuICAgICAgfSwgZGF0YSA9PiB7XG4gICAgICAgIG9uUmVzcG9uc2UoZGF0YSk7XG4gICAgICAgIHJlcyhkYXRhKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICAgIGNoYW5uZWwsXG4gICAgICAgIGRhdGFcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gc2VuZFRhYk1lc3NhZ2UoY2hhbm5lbCwgdGFiSWQsIGRhdGEpIHtcbiAgcmV0dXJuIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKHRhYklkLCB7XG4gICAgY2hhbm5lbCxcbiAgICBkYXRhXG4gIH0pO1xufSIsImltcG9ydCB7IGN1cnJlbnRFbnYsIEV4ZWNFbnYgfSBmcm9tICcuL2Nocm9tZSc7XG4vLyBzdG9yYWdlID09PT09PT09PT09PT1cbmV4cG9ydCBmdW5jdGlvbiBnZXRMb2NhbFN0b3JhZ2UobmFtZSwgZGVmYXVsdFZhbHVlKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShyZXMgPT4ge1xuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChuYW1lLCBycyA9PiByZXMocnM/LltuYW1lXSA/PyBkZWZhdWx0VmFsdWUpKTtcbiAgfSk7XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2V0TG9jYWxTdG9yYWdlKG5hbWUsIHZhbHVlKSB7XG4gIGF3YWl0IGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7XG4gICAgW25hbWVdOiB2YWx1ZVxuICB9KTtcbn1cbmNvbnN0IHN0b3JhZ2VIYW5kbGVyU3RvcmUgPSBuZXcgTWFwKCk7XG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJTdG9yYWdlKGtleSwgaGFuZGxlcikge1xuICBzdG9yYWdlSGFuZGxlclN0b3JlLnNldChrZXksIGhhbmRsZXIpO1xuICBpZiAoY3VycmVudEVudiAhPT0gRXhlY0Vudi5Db250ZW50KSB7XG4gICAgY29uc29sZS5sb2coYFtzdG9yYWdlXSByZWdpc3RlciBtb2R1bGU6ICR7a2V5fWApO1xuICB9XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U3RvcmFnZUV4cG9ydERhdGEoKSB7XG4gIGNvbnN0IGRhdGEgPSB7fTtcbiAgZm9yIChsZXQgW2tleSwgaGFuZGxlcl0gb2Ygc3RvcmFnZUhhbmRsZXJTdG9yZSkge1xuICAgIGlmIChoYW5kbGVyKSB7XG4gICAgICBkYXRhW2tleV0gPSBhd2FpdCBoYW5kbGVyLm9uRXhwb3J0KCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShkYXRhLCBudWxsLCA0KTtcbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZXRTdG9yYWdlSW1wb3J0RGF0YShkYXRhKSB7XG4gIGNvbnN0IGRhdGFPYmplY3QgPSBKU09OLnBhcnNlKGRhdGEpO1xuICBmb3IgKGxldCBba2V5LCBoYW5kbGVyXSBvZiBzdG9yYWdlSGFuZGxlclN0b3JlKSB7XG4gICAgY29uc3QgaW1wb3J0RGF0YSA9IGRhdGFPYmplY3Rba2V5XTtcbiAgICBpZiAoaW1wb3J0RGF0YSkge1xuICAgICAgYXdhaXQgaGFuZGxlcj8ub25JbXBvcnQoaW1wb3J0RGF0YSk7XG4gICAgfVxuICB9XG59IiwiZXhwb3J0IGZ1bmN0aW9uIGV2YWxTY3JpcHQoc2NyaXB0KSB7XG4gIGxldCB2YXJPYmogPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICBjb25zdCB2YXJOYW1lcyA9IFtdO1xuICBjb25zdCB2YXJEYXRhID0gW107XG4gIE9iamVjdC5lbnRyaWVzKHZhck9iaikuZm9yRWFjaChfcmVmID0+IHtcbiAgICBsZXQgW25hbWUsIGRhdGFdID0gX3JlZjtcbiAgICB2YXJOYW1lcy5wdXNoKG5hbWUpO1xuICAgIHZhckRhdGEucHVzaChkYXRhKTtcbiAgfSk7XG4gIHJldHVybiBuZXcgRnVuY3Rpb24oLi4udmFyTmFtZXMsIGBcInVzZSBzdHJpY3RcIjske3NjcmlwdH1gKSguLi52YXJEYXRhKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiAkKHNlbGVjdG9yKSB7XG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBkZWJvdW5jZShmbikge1xuICBsZXQgZGVsYXkgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IDMwMDtcbiAgbGV0IHRpbWVyID0gdW5kZWZpbmVkO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4gZm4oLi4uYXJncyksIGRlbGF5KTtcbiAgfTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzbGVlcCgpIHtcbiAgbGV0IG4gPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IDA7XG4gIHJldHVybiBuZXcgUHJvbWlzZShyZXMgPT4ge1xuICAgIHNldFRpbWVvdXQocmVzLCBuKTtcbiAgfSk7XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9hZEltYWdlKHNyYykge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG4gICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgaW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIHJlcyhpbWcpO1xuICAgIH07XG4gICAgaW1nLm9uZXJyb3IgPSByZWo7XG4gICAgaW1nLnNyYyA9IHNyYztcbiAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gYXJyYXlHcm91cEJ5KGFycmF5LCBjb25kaXRpb24pIHtcbiAgY29uc3QgbWFwID0gbmV3IE1hcCgpO1xuICBhcnJheS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgIGNvbnN0IHZhbHVlID0gY29uZGl0aW9uKGl0ZW0pO1xuICAgIGlmICghbWFwLmhhcyh2YWx1ZSkpIHtcbiAgICAgIG1hcC5zZXQodmFsdWUsIFtdKTtcbiAgICB9XG4gICAgbWFwLmdldCh2YWx1ZSkucHVzaChpdGVtKTtcbiAgfSk7XG4gIHJldHVybiBbLi4ubWFwLnZhbHVlcygpXTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpbnNlcnRUZW1wbGF0ZSh0ZW1wbGF0ZSkge1xuICByZXR1cm4gJCgnI21haW4nKS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIHRlbXBsYXRlKTtcbn1cbi8vIGV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkU2NyaXB0KHNyYzogc3RyaW5nKSB7XG4vLyAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuLy8gICAgICAgICBjb25zdCBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4vLyAgICAgICAgIHMuc3JjID0gc3JjO1xuLy8gICAgICAgICBzLm9ubG9hZCA9IHJlcztcbi8vICAgICAgICAgcy5vbmVycm9yID0gcmVqO1xuLy8gICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHMpO1xuLy8gICAgIH0pO1xuLy8gfVxuZXhwb3J0IGZ1bmN0aW9uIGRvd25sb2FkKGZpbGVOYW1lLCB1cmwpIHtcbiAgY29uc3QgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgYS5ocmVmID0gdXJsO1xuICBhLmRvd25sb2FkID0gZmlsZU5hbWU7XG4gIGEuY2xpY2soKTtcbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZWFkRmlsZShmaWxlKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgICBjb25zdCBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICBmaWxlUmVhZGVyLnJlYWRBc1RleHQoZmlsZSk7XG4gICAgZmlsZVJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBmaWxlQ29udGVudCA9IGZpbGVSZWFkZXIucmVzdWx0O1xuICAgICAgcmVzKGZpbGVDb250ZW50KTtcbiAgICB9O1xuICAgIGZpbGVSZWFkZXIub25lcnJvciA9IHJlajtcbiAgfSk7XG59XG5mdW5jdGlvbiB0b1ByZWcodXJsUGF0dGVybikge1xuICAvLyDov5nph4zmnInkupvnibnmrorlrZfnrKblj6/og73pnIDopoHlpITnkIbvvIzkvovlpoI/5LmL57G755qEXG4gIHJldHVybiBuZXcgUmVnRXhwKFN0cmluZy5yYXdgXiR7dXJsUGF0dGVybn1gLnJlcGxhY2UoLyhbXFw/XSkvZywgJ1xcXFwkMScpKTtcbn1cbi8qKlxuICogdXJsIOmAmumFjeespuWMuemFjeS9v+eUqFxuICovXG5leHBvcnQgZnVuY3Rpb24gbWF0Y2hVcmwodXJsLCBwYXR0ZXJuKSB7XG4gIHJldHVybiB0b1ByZWcocGF0dGVybikudGVzdCh1cmwpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIG1hdGNoVXJsUGF0dGVybih1cmwsIGl0ZW1MaXN0LCBnZXRVcmwpIHtcbiAgbGV0IG1hdGNoID0gdW5kZWZpbmVkO1xuICBpdGVtTGlzdC5tYXAoaXRlbSA9PiBnZXRVcmwoaXRlbSkpLmZvckVhY2goKHVybFBhdHRlcm4sIGluZGV4KSA9PiB7XG4gICAgLy8g5Yy56YWN6ICM5LiU5q+U5LmL5YmNbWF0Y2jnmoTmm7Tplb9cbiAgICBpZiAobWF0Y2hVcmwodXJsLCB1cmxQYXR0ZXJuKSAmJiAoIW1hdGNoIHx8IHVybFBhdHRlcm4ubGVuZ3RoID4gZ2V0VXJsKG1hdGNoKS5sZW5ndGgpKSB7XG4gICAgICBtYXRjaCA9IGl0ZW1MaXN0W2luZGV4XTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gbWF0Y2g7XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi4vLi4vLi4vLmNvbmZpZy95YXJuL2dsb2JhbC9ub2RlX21vZHVsZXMvcmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLmpzXCIpO1xudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvYmFja2dyb3VuZC9iYWNrZ3JvdW5kLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9