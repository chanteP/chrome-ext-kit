/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../.config/yarn/global/node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************************************!*\
  !*** ../../.config/yarn/global/node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************************************/
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
/* harmony export */   HfInference: () => (/* binding */ HfInference),
/* harmony export */   HfInferenceEndpoint: () => (/* binding */ HfInferenceEndpoint),
/* harmony export */   InferenceOutputError: () => (/* binding */ InferenceOutputError),
/* harmony export */   audioClassification: () => (/* binding */ audioClassification),
/* harmony export */   audioToAudio: () => (/* binding */ audioToAudio),
/* harmony export */   automaticSpeechRecognition: () => (/* binding */ automaticSpeechRecognition),
/* harmony export */   chatCompletion: () => (/* binding */ chatCompletion),
/* harmony export */   chatCompletionStream: () => (/* binding */ chatCompletionStream),
/* harmony export */   documentQuestionAnswering: () => (/* binding */ documentQuestionAnswering),
/* harmony export */   featureExtraction: () => (/* binding */ featureExtraction),
/* harmony export */   fillMask: () => (/* binding */ fillMask),
/* harmony export */   imageClassification: () => (/* binding */ imageClassification),
/* harmony export */   imageSegmentation: () => (/* binding */ imageSegmentation),
/* harmony export */   imageToImage: () => (/* binding */ imageToImage),
/* harmony export */   imageToText: () => (/* binding */ imageToText),
/* harmony export */   objectDetection: () => (/* binding */ objectDetection),
/* harmony export */   questionAnswering: () => (/* binding */ questionAnswering),
/* harmony export */   request: () => (/* binding */ request),
/* harmony export */   sentenceSimilarity: () => (/* binding */ sentenceSimilarity),
/* harmony export */   streamingRequest: () => (/* binding */ streamingRequest),
/* harmony export */   summarization: () => (/* binding */ summarization),
/* harmony export */   tableQuestionAnswering: () => (/* binding */ tableQuestionAnswering),
/* harmony export */   tabularClassification: () => (/* binding */ tabularClassification),
/* harmony export */   tabularRegression: () => (/* binding */ tabularRegression),
/* harmony export */   textClassification: () => (/* binding */ textClassification),
/* harmony export */   textGeneration: () => (/* binding */ textGeneration),
/* harmony export */   textGenerationStream: () => (/* binding */ textGenerationStream),
/* harmony export */   textToImage: () => (/* binding */ textToImage),
/* harmony export */   textToSpeech: () => (/* binding */ textToSpeech),
/* harmony export */   tokenClassification: () => (/* binding */ tokenClassification),
/* harmony export */   translation: () => (/* binding */ translation),
/* harmony export */   visualQuestionAnswering: () => (/* binding */ visualQuestionAnswering),
/* harmony export */   zeroShotClassification: () => (/* binding */ zeroShotClassification),
/* harmony export */   zeroShotImageClassification: () => (/* binding */ zeroShotImageClassification)
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
        throw new Error(JSON.stringify(output.error));
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
  const isNumArrayRec = (arr, maxDepth, curDepth = 0) => {
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
  constructor(accessToken = "", defaultOptions = {}) {
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
  constructor(endpointUrl, accessToken = "", defaultOptions = {}) {
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


// https://huggingface.co/settings/tokens
const HF_TOKEN = '';
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
/* harmony export */   ExecEnv: () => (/* binding */ ExecEnv),
/* harmony export */   currentEnv: () => (/* binding */ currentEnv),
/* harmony export */   evalScriptInTab: () => (/* binding */ evalScriptInTab),
/* harmony export */   getAllTabs: () => (/* binding */ getAllTabs),
/* harmony export */   getCurrentTab: () => (/* binding */ getCurrentTab),
/* harmony export */   getSelected: () => (/* binding */ getSelected),
/* harmony export */   getTab: () => (/* binding */ getTab),
/* harmony export */   popupMaxHeight: () => (/* binding */ popupMaxHeight),
/* harmony export */   popupMaxWidth: () => (/* binding */ popupMaxWidth),
/* harmony export */   popupMinWidth: () => (/* binding */ popupMinWidth),
/* harmony export */   setBodySize: () => (/* binding */ setBodySize)
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
function evalScriptInTab(tabId, script, varObj = {}) {
  const varNames = [];
  const varData = [];
  Object.entries(varObj).forEach(([name, data]) => {
    varNames.push(name);
    varData.push(data);
  });
  chrome.scripting.executeScript({
    target: {
      tabId
    },
    args: [script, varNames, varData],
    func: (script, varNames = [], varData = []) => {
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
/* harmony export */   bindDragger: () => (/* binding */ bindDragger)
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
/* harmony export */   $: () => (/* reexport safe */ _tools__WEBPACK_IMPORTED_MODULE_4__.$),
/* harmony export */   ExecEnv: () => (/* reexport safe */ _chrome__WEBPACK_IMPORTED_MODULE_3__.ExecEnv),
/* harmony export */   arrayGroupBy: () => (/* reexport safe */ _tools__WEBPACK_IMPORTED_MODULE_4__.arrayGroupBy),
/* harmony export */   bindDragger: () => (/* reexport safe */ _dragger__WEBPACK_IMPORTED_MODULE_1__.bindDragger),
/* harmony export */   currentEnv: () => (/* reexport safe */ _chrome__WEBPACK_IMPORTED_MODULE_3__.currentEnv),
/* harmony export */   debounce: () => (/* reexport safe */ _tools__WEBPACK_IMPORTED_MODULE_4__.debounce),
/* harmony export */   download: () => (/* reexport safe */ _tools__WEBPACK_IMPORTED_MODULE_4__.download),
/* harmony export */   evalScript: () => (/* reexport safe */ _tools__WEBPACK_IMPORTED_MODULE_4__.evalScript),
/* harmony export */   evalScriptInTab: () => (/* reexport safe */ _chrome__WEBPACK_IMPORTED_MODULE_3__.evalScriptInTab),
/* harmony export */   getAllTabs: () => (/* reexport safe */ _chrome__WEBPACK_IMPORTED_MODULE_3__.getAllTabs),
/* harmony export */   getCurrentTab: () => (/* reexport safe */ _chrome__WEBPACK_IMPORTED_MODULE_3__.getCurrentTab),
/* harmony export */   getLocalStorage: () => (/* reexport safe */ _storage__WEBPACK_IMPORTED_MODULE_2__.getLocalStorage),
/* harmony export */   getSelected: () => (/* reexport safe */ _chrome__WEBPACK_IMPORTED_MODULE_3__.getSelected),
/* harmony export */   getStorageExportData: () => (/* reexport safe */ _storage__WEBPACK_IMPORTED_MODULE_2__.getStorageExportData),
/* harmony export */   getTab: () => (/* reexport safe */ _chrome__WEBPACK_IMPORTED_MODULE_3__.getTab),
/* harmony export */   insertTemplate: () => (/* reexport safe */ _tools__WEBPACK_IMPORTED_MODULE_4__.insertTemplate),
/* harmony export */   loadImage: () => (/* reexport safe */ _tools__WEBPACK_IMPORTED_MODULE_4__.loadImage),
/* harmony export */   matchUrl: () => (/* reexport safe */ _tools__WEBPACK_IMPORTED_MODULE_4__.matchUrl),
/* harmony export */   matchUrlPattern: () => (/* reexport safe */ _tools__WEBPACK_IMPORTED_MODULE_4__.matchUrlPattern),
/* harmony export */   onRuntimeMessage: () => (/* reexport safe */ _message__WEBPACK_IMPORTED_MODULE_0__.onRuntimeMessage),
/* harmony export */   popupMaxHeight: () => (/* reexport safe */ _chrome__WEBPACK_IMPORTED_MODULE_3__.popupMaxHeight),
/* harmony export */   popupMaxWidth: () => (/* reexport safe */ _chrome__WEBPACK_IMPORTED_MODULE_3__.popupMaxWidth),
/* harmony export */   popupMinWidth: () => (/* reexport safe */ _chrome__WEBPACK_IMPORTED_MODULE_3__.popupMinWidth),
/* harmony export */   readFile: () => (/* reexport safe */ _tools__WEBPACK_IMPORTED_MODULE_4__.readFile),
/* harmony export */   registerStorage: () => (/* reexport safe */ _storage__WEBPACK_IMPORTED_MODULE_2__.registerStorage),
/* harmony export */   sendRuntimeMessage: () => (/* reexport safe */ _message__WEBPACK_IMPORTED_MODULE_0__.sendRuntimeMessage),
/* harmony export */   sendTabMessage: () => (/* reexport safe */ _message__WEBPACK_IMPORTED_MODULE_0__.sendTabMessage),
/* harmony export */   setBodySize: () => (/* reexport safe */ _chrome__WEBPACK_IMPORTED_MODULE_3__.setBodySize),
/* harmony export */   setLocalStorage: () => (/* reexport safe */ _storage__WEBPACK_IMPORTED_MODULE_2__.setLocalStorage),
/* harmony export */   setStorageImportData: () => (/* reexport safe */ _storage__WEBPACK_IMPORTED_MODULE_2__.setStorageImportData),
/* harmony export */   sleep: () => (/* reexport safe */ _tools__WEBPACK_IMPORTED_MODULE_4__.sleep)
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
/* harmony export */   onRuntimeMessage: () => (/* binding */ onRuntimeMessage),
/* harmony export */   sendRuntimeMessage: () => (/* binding */ sendRuntimeMessage),
/* harmony export */   sendTabMessage: () => (/* binding */ sendTabMessage)
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
/* harmony export */   getLocalStorage: () => (/* binding */ getLocalStorage),
/* harmony export */   getStorageExportData: () => (/* binding */ getStorageExportData),
/* harmony export */   registerStorage: () => (/* binding */ registerStorage),
/* harmony export */   setLocalStorage: () => (/* binding */ setLocalStorage),
/* harmony export */   setStorageImportData: () => (/* binding */ setStorageImportData)
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
/* harmony export */   $: () => (/* binding */ $),
/* harmony export */   arrayGroupBy: () => (/* binding */ arrayGroupBy),
/* harmony export */   debounce: () => (/* binding */ debounce),
/* harmony export */   download: () => (/* binding */ download),
/* harmony export */   evalScript: () => (/* binding */ evalScript),
/* harmony export */   insertTemplate: () => (/* binding */ insertTemplate),
/* harmony export */   loadImage: () => (/* binding */ loadImage),
/* harmony export */   matchUrl: () => (/* binding */ matchUrl),
/* harmony export */   matchUrlPattern: () => (/* binding */ matchUrlPattern),
/* harmony export */   readFile: () => (/* binding */ readFile),
/* harmony export */   sleep: () => (/* binding */ sleep)
/* harmony export */ });
function evalScript(script, varObj = {}) {
  const varNames = [];
  const varData = [];
  Object.entries(varObj).forEach(([name, data]) => {
    varNames.push(name);
    varData.push(data);
  });
  return new Function(...varNames, `"use strict";${script}`)(...varData);
}
function $(selector) {
  return document.querySelector(selector);
}
function debounce(fn, delay = 300) {
  let timer = undefined;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
function sleep(n = 0) {
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
/******/ 	__webpack_require__("../../.config/yarn/global/node_modules/regenerator-runtime/runtime.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/background/background.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQzExQkE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUN2R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDN0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBOzs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBRU5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ucC1jaHJvbWUtZXh0ZW5zaW9uLy4uLy4uLy5jb25maWcveWFybi9nbG9iYWwvbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyIsIndlYnBhY2s6Ly9ucC1jaHJvbWUtZXh0ZW5zaW9uLy4vbm9kZV9tb2R1bGVzL0BodWdnaW5nZmFjZS9pbmZlcmVuY2UvZGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly9ucC1jaHJvbWUtZXh0ZW5zaW9uLy4vc3JjL2JhY2tncm91bmQvYmFja2dyb3VuZC50cyIsIndlYnBhY2s6Ly9ucC1jaHJvbWUtZXh0ZW5zaW9uLy4vc3JjL2JhY2tncm91bmQvY29tbW9uLnRzIiwid2VicGFjazovL25wLWNocm9tZS1leHRlbnNpb24vLi9zcmMvbW9kdWxlcy9odWdnaW5nZmFjZS9iYWNrZ3JvdW5kLnRzIiwid2VicGFjazovL25wLWNocm9tZS1leHRlbnNpb24vLi9zcmMvbW9kdWxlcy9vdmVybGF5L2JhY2tncm91bmQudHMiLCJ3ZWJwYWNrOi8vbnAtY2hyb21lLWV4dGVuc2lvbi8uL3NyYy91dGlscy9jaHJvbWUudHMiLCJ3ZWJwYWNrOi8vbnAtY2hyb21lLWV4dGVuc2lvbi8uL3NyYy91dGlscy9kcmFnZ2VyLnRzIiwid2VicGFjazovL25wLWNocm9tZS1leHRlbnNpb24vLi9zcmMvdXRpbHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbnAtY2hyb21lLWV4dGVuc2lvbi8uL3NyYy91dGlscy9tZXNzYWdlLnRzIiwid2VicGFjazovL25wLWNocm9tZS1leHRlbnNpb24vLi9zcmMvdXRpbHMvc3RvcmFnZS50cyIsIndlYnBhY2s6Ly9ucC1jaHJvbWUtZXh0ZW5zaW9uLy4vc3JjL3V0aWxzL3Rvb2xzLnRzIiwid2VicGFjazovL25wLWNocm9tZS1leHRlbnNpb24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbnAtY2hyb21lLWV4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbnAtY2hyb21lLWV4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25wLWNocm9tZS1leHRlbnNpb24vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9ucC1jaHJvbWUtZXh0ZW5zaW9uL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vbnAtY2hyb21lLWV4dGVuc2lvbi93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vbnAtY2hyb21lLWV4dGVuc2lvbi93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cbnZhciBydW50aW1lID0gZnVuY3Rpb24gKGV4cG9ydHMpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIE9wID0gT2JqZWN0LnByb3RvdHlwZTtcbiAgdmFyIGhhc093biA9IE9wLmhhc093blByb3BlcnR5O1xuICB2YXIgZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkgfHwgZnVuY3Rpb24gKG9iaiwga2V5LCBkZXNjKSB7XG4gICAgb2JqW2tleV0gPSBkZXNjLnZhbHVlO1xuICB9O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cbiAgdmFyICRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2wgOiB7fTtcbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcbiAgdmFyIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIjtcbiAgdmFyIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcbiAgZnVuY3Rpb24gZGVmaW5lKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIG9ialtrZXldO1xuICB9XG4gIHRyeSB7XG4gICAgLy8gSUUgOCBoYXMgYSBicm9rZW4gT2JqZWN0LmRlZmluZVByb3BlcnR5IHRoYXQgb25seSB3b3JrcyBvbiBET00gb2JqZWN0cy5cbiAgICBkZWZpbmUoe30sIFwiXCIpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBkZWZpbmUgPSBmdW5jdGlvbiAob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgICByZXR1cm4gb2JqW2tleV0gPSB2YWx1ZTtcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBJZiBvdXRlckZuIHByb3ZpZGVkIGFuZCBvdXRlckZuLnByb3RvdHlwZSBpcyBhIEdlbmVyYXRvciwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci5cbiAgICB2YXIgcHJvdG9HZW5lcmF0b3IgPSBvdXRlckZuICYmIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gb3V0ZXJGbiA6IEdlbmVyYXRvcjtcbiAgICB2YXIgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShwcm90b0dlbmVyYXRvci5wcm90b3R5cGUpO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pO1xuICAgIC8vIFRoZSAuX2ludm9rZSBtZXRob2QgdW5pZmllcyB0aGUgaW1wbGVtZW50YXRpb25zIG9mIHRoZSAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMuXG4gICAgZGVmaW5lUHJvcGVydHkoZ2VuZXJhdG9yLCBcIl9pbnZva2VcIiwge1xuICAgICAgdmFsdWU6IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dClcbiAgICB9KTtcbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG4gIGV4cG9ydHMud3JhcCA9IHdyYXA7XG4gIC8vIFRyeS9jYXRjaCBoZWxwZXIgdG8gbWluaW1pemUgZGVvcHRpbWl6YXRpb25zLiBSZXR1cm5zIGEgY29tcGxldGlvblxuICAvLyByZWNvcmQgbGlrZSBjb250ZXh0LnRyeUVudHJpZXNbaV0uY29tcGxldGlvbi4gVGhpcyBpbnRlcmZhY2UgY291bGRcbiAgLy8gaGF2ZSBiZWVuIChhbmQgd2FzIHByZXZpb3VzbHkpIGRlc2lnbmVkIHRvIHRha2UgYSBjbG9zdXJlIHRvIGJlXG4gIC8vIGludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIGJ1dCBpbiBhbGwgdGhlIGNhc2VzIHdlIGNhcmUgYWJvdXQgd2VcbiAgLy8gYWxyZWFkeSBoYXZlIGFuIGV4aXN0aW5nIG1ldGhvZCB3ZSB3YW50IHRvIGNhbGwsIHNvIHRoZXJlJ3Mgbm8gbmVlZFxuICAvLyB0byBjcmVhdGUgYSBuZXcgZnVuY3Rpb24gb2JqZWN0LiBXZSBjYW4gZXZlbiBnZXQgYXdheSB3aXRoIGFzc3VtaW5nXG4gIC8vIHRoZSBtZXRob2QgdGFrZXMgZXhhY3RseSBvbmUgYXJndW1lbnQsIHNpbmNlIHRoYXQgaGFwcGVucyB0byBiZSB0cnVlXG4gIC8vIGluIGV2ZXJ5IGNhc2UsIHNvIHdlIGRvbid0IGhhdmUgdG8gdG91Y2ggdGhlIGFyZ3VtZW50cyBvYmplY3QuIFRoZVxuICAvLyBvbmx5IGFkZGl0aW9uYWwgYWxsb2NhdGlvbiByZXF1aXJlZCBpcyB0aGUgY29tcGxldGlvbiByZWNvcmQsIHdoaWNoXG4gIC8vIGhhcyBhIHN0YWJsZSBzaGFwZSBhbmQgc28gaG9wZWZ1bGx5IHNob3VsZCBiZSBjaGVhcCB0byBhbGxvY2F0ZS5cbiAgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IFwibm9ybWFsXCIsXG4gICAgICAgIGFyZzogZm4uY2FsbChvYmosIGFyZylcbiAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBcInRocm93XCIsXG4gICAgICAgIGFyZzogZXJyXG4gICAgICB9O1xuICAgIH1cbiAgfVxuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRTdGFydCA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkWWllbGQgPSBcInN1c3BlbmRlZFlpZWxkXCI7XG4gIHZhciBHZW5TdGF0ZUV4ZWN1dGluZyA9IFwiZXhlY3V0aW5nXCI7XG4gIHZhciBHZW5TdGF0ZUNvbXBsZXRlZCA9IFwiY29tcGxldGVkXCI7XG4gIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuICAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuICAvLyBUaGlzIGlzIGEgcG9seWZpbGwgZm9yICVJdGVyYXRvclByb3RvdHlwZSUgZm9yIGVudmlyb25tZW50cyB0aGF0XG4gIC8vIGRvbid0IG5hdGl2ZWx5IHN1cHBvcnQgaXQuXG4gIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuICBkZWZpbmUoSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pO1xuICB2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG4gIHZhciBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvICYmIGdldFByb3RvKGdldFByb3RvKHZhbHVlcyhbXSkpKTtcbiAgaWYgKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPcCAmJiBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpKSB7XG4gICAgLy8gVGhpcyBlbnZpcm9ubWVudCBoYXMgYSBuYXRpdmUgJUl0ZXJhdG9yUHJvdG90eXBlJTsgdXNlIGl0IGluc3RlYWRcbiAgICAvLyBvZiB0aGUgcG9seWZpbGwuXG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxuICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPSBHZW5lcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSk7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICBkZWZpbmVQcm9wZXJ0eShHcCwgXCJjb25zdHJ1Y3RvclwiLCB7XG4gICAgdmFsdWU6IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KTtcbiAgZGVmaW5lUHJvcGVydHkoR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsIFwiY29uc3RydWN0b3JcIiwge1xuICAgIHZhbHVlOiBHZW5lcmF0b3JGdW5jdGlvbixcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfSk7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gZGVmaW5lKEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JGdW5jdGlvblwiKTtcbiAgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcbiAgICAgIGRlZmluZShwcm90b3R5cGUsIG1ldGhvZCwgZnVuY3Rpb24gKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uIChnZW5GdW4pIHtcbiAgICB2YXIgY3RvciA9IHR5cGVvZiBnZW5GdW4gPT09IFwiZnVuY3Rpb25cIiAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIGN0b3IgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fFxuICAgIC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAvLyBkbyBpcyB0byBjaGVjayBpdHMgLm5hbWUgcHJvcGVydHkuXG4gICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiIDogZmFsc2U7XG4gIH07XG4gIGV4cG9ydHMubWFyayA9IGZ1bmN0aW9uIChnZW5GdW4pIHtcbiAgICBpZiAoT2JqZWN0LnNldFByb3RvdHlwZU9mKSB7XG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICAgIGRlZmluZShnZW5GdW4sIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvckZ1bmN0aW9uXCIpO1xuICAgIH1cbiAgICBnZW5GdW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcCk7XG4gICAgcmV0dXJuIGdlbkZ1bjtcbiAgfTtcbiAgLy8gV2l0aGluIHRoZSBib2R5IG9mIGFueSBhc3luYyBmdW5jdGlvbiwgYGF3YWl0IHhgIGlzIHRyYW5zZm9ybWVkIHRvXG4gIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gIC8vIGBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpYCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC5cbiAgZXhwb3J0cy5hd3JhcCA9IGZ1bmN0aW9uIChhcmcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgX19hd2FpdDogYXJnXG4gICAgfTtcbiAgfTtcbiAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcihnZW5lcmF0b3IsIFByb21pc2VJbXBsKSB7XG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpO1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmc7XG4gICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgaW52b2tlKFwidGhyb3dcIiwgZXJyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uICh1bndyYXBwZWQpIHtcbiAgICAgICAgICAvLyBXaGVuIGEgeWllbGRlZCBQcm9taXNlIGlzIHJlc29sdmVkLCBpdHMgZmluYWwgdmFsdWUgYmVjb21lc1xuICAgICAgICAgIC8vIHRoZSAudmFsdWUgb2YgdGhlIFByb21pc2U8e3ZhbHVlLGRvbmV9PiByZXN1bHQgZm9yIHRoZVxuICAgICAgICAgIC8vIGN1cnJlbnQgaXRlcmF0aW9uLlxuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZDtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgIC8vIElmIGEgcmVqZWN0ZWQgUHJvbWlzZSB3YXMgeWllbGRlZCwgdGhyb3cgdGhlIHJlamVjdGlvbiBiYWNrXG4gICAgICAgICAgLy8gaW50byB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIHNvIGl0IGNhbiBiZSBoYW5kbGVkIHRoZXJlLlxuICAgICAgICAgIHJldHVybiBpbnZva2UoXCJ0aHJvd1wiLCBlcnJvciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZUltcGwoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcHJldmlvdXNQcm9taXNlID1cbiAgICAgIC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgIC8vIGFsbCBwcmV2aW91cyBQcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQgYmVmb3JlIGNhbGxpbmcgaW52b2tlLFxuICAgICAgLy8gc28gdGhhdCByZXN1bHRzIGFyZSBhbHdheXMgZGVsaXZlcmVkIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBJZlxuICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgIC8vIGNhbGwgaW52b2tlIGltbWVkaWF0ZWx5LCB3aXRob3V0IHdhaXRpbmcgb24gYSBjYWxsYmFjayB0byBmaXJlLFxuICAgICAgLy8gc28gdGhhdCB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhcyB0aGUgb3Bwb3J0dW5pdHkgdG8gZG9cbiAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgIC8vIGlzIHdoeSB0aGUgUHJvbWlzZSBjb25zdHJ1Y3RvciBzeW5jaHJvbm91c2x5IGludm9rZXMgaXRzXG4gICAgICAvLyBleGVjdXRvciBjYWxsYmFjaywgYW5kIHdoeSBhc3luYyBmdW5jdGlvbnMgc3luY2hyb25vdXNseVxuICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBhc3luYyBnZW5lcmF0b3JzLCBpdCBpcyBlc3BlY2lhbGx5XG4gICAgICAvLyBpbXBvcnRhbnQgdG8gZ2V0IHRoaXMgcmlnaHQsIGV2ZW4gdGhvdWdoIGl0IHJlcXVpcmVzIGNhcmUuXG4gICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyxcbiAgICAgIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5IGxhdGVyXG4gICAgICAvLyBpbnZvY2F0aW9ucyBvZiB0aGUgaXRlcmF0b3IuXG4gICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZykgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgIH1cbiAgICAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuICAgIGRlZmluZVByb3BlcnR5KHRoaXMsIFwiX2ludm9rZVwiLCB7XG4gICAgICB2YWx1ZTogZW5xdWV1ZVxuICAgIH0pO1xuICB9XG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSk7XG4gIGRlZmluZShBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSwgYXN5bmNJdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KTtcbiAgZXhwb3J0cy5Bc3luY0l0ZXJhdG9yID0gQXN5bmNJdGVyYXRvcjtcbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIGV4cG9ydHMuYXN5bmMgPSBmdW5jdGlvbiAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QsIFByb21pc2VJbXBsKSB7XG4gICAgaWYgKFByb21pc2VJbXBsID09PSB2b2lkIDApIFByb21pc2VJbXBsID0gUHJvbWlzZTtcbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpLCBQcm9taXNlSW1wbCk7XG4gICAgcmV0dXJuIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKSA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLlxuICAgIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICB9KTtcbiAgfTtcbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcbiAgICByZXR1cm4gZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlRXhlY3V0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICB9XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgfVxuICAgICAgICAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgIGNvbnRleHQuYXJnID0gYXJnO1xuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgdmFyIGRlbGVnYXRlUmVzdWx0ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG4gICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlUmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgLy8gU2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gY29udGV4dC5hcmc7XG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydCkge1xuICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAgIHRocm93IGNvbnRleHQuYXJnO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgfVxuICAgICAgICBzdGF0ZSA9IEdlblN0YXRlRXhlY3V0aW5nO1xuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmUgPyBHZW5TdGF0ZUNvbXBsZXRlZCA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG4gICAgICAgICAgaWYgKHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgIC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cbiAgLy8gQ2FsbCBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF0oY29udGV4dC5hcmcpIGFuZCBoYW5kbGUgdGhlXG4gIC8vIHJlc3VsdCwgZWl0aGVyIGJ5IHJldHVybmluZyBhIHsgdmFsdWUsIGRvbmUgfSByZXN1bHQgZnJvbSB0aGVcbiAgLy8gZGVsZWdhdGUgaXRlcmF0b3IsIG9yIGJ5IG1vZGlmeWluZyBjb250ZXh0Lm1ldGhvZCBhbmQgY29udGV4dC5hcmcsXG4gIC8vIHNldHRpbmcgY29udGV4dC5kZWxlZ2F0ZSB0byBudWxsLCBhbmQgcmV0dXJuaW5nIHRoZSBDb250aW51ZVNlbnRpbmVsLlxuICBmdW5jdGlvbiBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIG1ldGhvZE5hbWUgPSBjb250ZXh0Lm1ldGhvZDtcbiAgICB2YXIgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbbWV0aG9kTmFtZV07XG4gICAgaWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBBIC50aHJvdyBvciAucmV0dXJuIHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyAudGhyb3dcbiAgICAgIC8vIG1ldGhvZCwgb3IgYSBtaXNzaW5nIC5uZXh0IG1laHRvZCwgYWx3YXlzIHRlcm1pbmF0ZSB0aGVcbiAgICAgIC8vIHlpZWxkKiBsb29wLlxuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICAvLyBOb3RlOiBbXCJyZXR1cm5cIl0gbXVzdCBiZSB1c2VkIGZvciBFUzMgcGFyc2luZyBjb21wYXRpYmlsaXR5LlxuICAgICAgaWYgKG1ldGhvZE5hbWUgPT09IFwidGhyb3dcIiAmJiBkZWxlZ2F0ZS5pdGVyYXRvcltcInJldHVyblwiXSkge1xuICAgICAgICAvLyBJZiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIGEgcmV0dXJuIG1ldGhvZCwgZ2l2ZSBpdCBhXG4gICAgICAgIC8vIGNoYW5jZSB0byBjbGVhbiB1cC5cbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG4gICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgLy8gSWYgbWF5YmVJbnZva2VEZWxlZ2F0ZShjb250ZXh0KSBjaGFuZ2VkIGNvbnRleHQubWV0aG9kIGZyb21cbiAgICAgICAgICAvLyBcInJldHVyblwiIHRvIFwidGhyb3dcIiwgbGV0IHRoYXQgb3ZlcnJpZGUgdGhlIFR5cGVFcnJvciBiZWxvdy5cbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1ldGhvZE5hbWUgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIlRoZSBpdGVyYXRvciBkb2VzIG5vdCBwcm92aWRlIGEgJ1wiICsgbWV0aG9kTmFtZSArIFwiJyBtZXRob2RcIik7XG4gICAgICB9XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKG1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGNvbnRleHQuYXJnKTtcbiAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG4gICAgaWYgKCFpbmZvKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgLy8gQXNzaWduIHRoZSByZXN1bHQgb2YgdGhlIGZpbmlzaGVkIGRlbGVnYXRlIHRvIHRoZSB0ZW1wb3JhcnlcbiAgICAgIC8vIHZhcmlhYmxlIHNwZWNpZmllZCBieSBkZWxlZ2F0ZS5yZXN1bHROYW1lIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTtcbiAgICAgIC8vIFJlc3VtZSBleGVjdXRpb24gYXQgdGhlIGRlc2lyZWQgbG9jYXRpb24gKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7XG4gICAgICAvLyBJZiBjb250ZXh0Lm1ldGhvZCB3YXMgXCJ0aHJvd1wiIGJ1dCB0aGUgZGVsZWdhdGUgaGFuZGxlZCB0aGVcbiAgICAgIC8vIGV4Y2VwdGlvbiwgbGV0IHRoZSBvdXRlciBnZW5lcmF0b3IgcHJvY2VlZCBub3JtYWxseS4gSWZcbiAgICAgIC8vIGNvbnRleHQubWV0aG9kIHdhcyBcIm5leHRcIiwgZm9yZ2V0IGNvbnRleHQuYXJnIHNpbmNlIGl0IGhhcyBiZWVuXG4gICAgICAvLyBcImNvbnN1bWVkXCIgYnkgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yLiBJZiBjb250ZXh0Lm1ldGhvZCB3YXNcbiAgICAgIC8vIFwicmV0dXJuXCIsIGFsbG93IHRoZSBvcmlnaW5hbCAucmV0dXJuIGNhbGwgdG8gY29udGludWUgaW4gdGhlXG4gICAgICAvLyBvdXRlciBnZW5lcmF0b3IuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlLXlpZWxkIHRoZSByZXN1bHQgcmV0dXJuZWQgYnkgdGhlIGRlbGVnYXRlIG1ldGhvZC5cbiAgICAgIHJldHVybiBpbmZvO1xuICAgIH1cbiAgICAvLyBUaGUgZGVsZWdhdGUgaXRlcmF0b3IgaXMgZmluaXNoZWQsIHNvIGZvcmdldCBpdCBhbmQgY29udGludWUgd2l0aFxuICAgIC8vIHRoZSBvdXRlciBnZW5lcmF0b3IuXG4gICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gIH1cbiAgLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuICBkZWZpbmUoR3AsIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvclwiKTtcbiAgLy8gQSBHZW5lcmF0b3Igc2hvdWxkIGFsd2F5cyByZXR1cm4gaXRzZWxmIGFzIHRoZSBpdGVyYXRvciBvYmplY3Qgd2hlbiB0aGVcbiAgLy8gQEBpdGVyYXRvciBmdW5jdGlvbiBpcyBjYWxsZWQgb24gaXQuIFNvbWUgYnJvd3NlcnMnIGltcGxlbWVudGF0aW9ucyBvZiB0aGVcbiAgLy8gaXRlcmF0b3IgcHJvdG90eXBlIGNoYWluIGluY29ycmVjdGx5IGltcGxlbWVudCB0aGlzLCBjYXVzaW5nIHRoZSBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0IHRvIG5vdCBiZSByZXR1cm5lZCBmcm9tIHRoaXMgY2FsbC4gVGhpcyBlbnN1cmVzIHRoYXQgZG9lc24ndCBoYXBwZW4uXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvaXNzdWVzLzI3NCBmb3IgbW9yZSBkZXRhaWxzLlxuICBkZWZpbmUoR3AsIGl0ZXJhdG9yU3ltYm9sLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pO1xuICBkZWZpbmUoR3AsIFwidG9TdHJpbmdcIiwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9KTtcbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7XG4gICAgICB0cnlMb2M6IGxvY3NbMF1cbiAgICB9O1xuICAgIGlmICgxIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXTtcbiAgICB9XG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307XG4gICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiO1xuICAgIGRlbGV0ZSByZWNvcmQuYXJnO1xuICAgIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3tcbiAgICAgIHRyeUxvYzogXCJyb290XCJcbiAgICB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuICBleHBvcnRzLmtleXMgPSBmdW5jdGlvbiAodmFsKSB7XG4gICAgdmFyIG9iamVjdCA9IE9iamVjdCh2YWwpO1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIGtleXMucmV2ZXJzZSgpO1xuICAgIC8vIFJhdGhlciB0aGFuIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCBhIG5leHQgbWV0aG9kLCB3ZSBrZWVwXG4gICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cbiAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9O1xuICB9O1xuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlLm5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICB9XG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSxcbiAgICAgICAgICBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkge1xuICAgICAgICAgICAgICAgIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXTtcbiAgICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuICAgIHJldHVybiB7XG4gICAgICBuZXh0OiBkb25lUmVzdWx0XG4gICAgfTtcbiAgfVxuICBleHBvcnRzLnZhbHVlcyA9IHZhbHVlcztcbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgIGRvbmU6IHRydWVcbiAgICB9O1xuICB9XG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuICAgIHJlc2V0OiBmdW5jdGlvbiAoc2tpcFRlbXBSZXNldCkge1xuICAgICAgdGhpcy5wcmV2ID0gMDtcbiAgICAgIHRoaXMubmV4dCA9IDA7XG4gICAgICAvLyBSZXNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG4gICAgICBpZiAoIXNraXBUZW1wUmVzZXQpIHtcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgICAgLy8gTm90IHN1cmUgYWJvdXQgdGhlIG9wdGltYWwgb3JkZXIgb2YgdGhlc2UgY29uZGl0aW9uczpcbiAgICAgICAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT09IFwidFwiICYmIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmICFpc05hTigrbmFtZS5zbGljZSgxKSkpIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBzdG9wOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuICAgICAgdmFyIHJvb3RFbnRyeSA9IHRoaXMudHJ5RW50cmllc1swXTtcbiAgICAgIHZhciByb290UmVjb3JkID0gcm9vdEVudHJ5LmNvbXBsZXRpb247XG4gICAgICBpZiAocm9vdFJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uIChleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgICAgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgfVxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG4gICAgICAgIGlmIChjYXVnaHQpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gISFjYXVnaHQ7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKTtcbiAgICAgICAgICB2YXIgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG4gICAgICAgICAgaWYgKGhhc0NhdGNoICYmIGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgYWJydXB0OiBmdW5jdGlvbiAodHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiYgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJiB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmICh0eXBlID09PSBcImJyZWFrXCIgfHwgdHlwZSA9PT0gXCJjb250aW51ZVwiKSAmJiBmaW5hbGx5RW50cnkudHJ5TG9jIDw9IGFyZyAmJiBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gdHlwZTtcbiAgICAgIHJlY29yZC5hcmcgPSBhcmc7XG4gICAgICBpZiAoZmluYWxseUVudHJ5KSB7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jO1xuICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcbiAgICBjb21wbGV0ZTogZnVuY3Rpb24gKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJlY29yZC5hcmc7XG4gICAgICB9XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fCByZWNvcmQudHlwZSA9PT0gXCJjb250aW51ZVwiKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInJldHVyblwiKSB7XG4gICAgICAgIHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIiAmJiBhZnRlckxvYykge1xuICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgIH1cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH0sXG4gICAgZmluaXNoOiBmdW5jdGlvbiAoZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24gKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBUaGUgY29udGV4dC5jYXRjaCBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCB3aXRoIGEgbG9jYXRpb25cbiAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uIChpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH07XG4gICAgICBpZiAodGhpcy5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH07XG4gIC8vIFJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGVcbiAgLy8gb3Igbm90LCByZXR1cm4gdGhlIHJ1bnRpbWUgb2JqZWN0IHNvIHRoYXQgd2UgY2FuIGRlY2xhcmUgdGhlIHZhcmlhYmxlXG4gIC8vIHJlZ2VuZXJhdG9yUnVudGltZSBpbiB0aGUgb3V0ZXIgc2NvcGUsIHdoaWNoIGFsbG93cyB0aGlzIG1vZHVsZSB0byBiZVxuICAvLyBpbmplY3RlZCBlYXNpbHkgYnkgYGJpbi9yZWdlbmVyYXRvciAtLWluY2x1ZGUtcnVudGltZSBzY3JpcHQuanNgLlxuICByZXR1cm4gZXhwb3J0cztcbn0oXG4vLyBJZiB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGUsIHVzZSBtb2R1bGUuZXhwb3J0c1xuLy8gYXMgdGhlIHJlZ2VuZXJhdG9yUnVudGltZSBuYW1lc3BhY2UuIE90aGVyd2lzZSBjcmVhdGUgYSBuZXcgZW1wdHlcbi8vIG9iamVjdC4gRWl0aGVyIHdheSwgdGhlIHJlc3VsdGluZyBvYmplY3Qgd2lsbCBiZSB1c2VkIHRvIGluaXRpYWxpemVcbi8vIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgdmFyaWFibGUgYXQgdGhlIHRvcCBvZiB0aGlzIGZpbGUuXG50eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiID8gbW9kdWxlLmV4cG9ydHMgOiB7fSk7XG50cnkge1xuICByZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xufSBjYXRjaCAoYWNjaWRlbnRhbFN0cmljdE1vZGUpIHtcbiAgLy8gVGhpcyBtb2R1bGUgc2hvdWxkIG5vdCBiZSBydW5uaW5nIGluIHN0cmljdCBtb2RlLCBzbyB0aGUgYWJvdmVcbiAgLy8gYXNzaWdubWVudCBzaG91bGQgYWx3YXlzIHdvcmsgdW5sZXNzIHNvbWV0aGluZyBpcyBtaXNjb25maWd1cmVkLiBKdXN0XG4gIC8vIGluIGNhc2UgcnVudGltZS5qcyBhY2NpZGVudGFsbHkgcnVucyBpbiBzdHJpY3QgbW9kZSwgaW4gbW9kZXJuIGVuZ2luZXNcbiAgLy8gd2UgY2FuIGV4cGxpY2l0bHkgYWNjZXNzIGdsb2JhbFRoaXMuIEluIG9sZGVyIGVuZ2luZXMgd2UgY2FuIGVzY2FwZVxuICAvLyBzdHJpY3QgbW9kZSB1c2luZyBhIGdsb2JhbCBGdW5jdGlvbiBjYWxsLiBUaGlzIGNvdWxkIGNvbmNlaXZhYmx5IGZhaWxcbiAgLy8gaWYgYSBDb250ZW50IFNlY3VyaXR5IFBvbGljeSBmb3JiaWRzIHVzaW5nIEZ1bmN0aW9uLCBidXQgaW4gdGhhdCBjYXNlXG4gIC8vIHRoZSBwcm9wZXIgc29sdXRpb24gaXMgdG8gZml4IHRoZSBhY2NpZGVudGFsIHN0cmljdCBtb2RlIHByb2JsZW0uIElmXG4gIC8vIHlvdSd2ZSBtaXNjb25maWd1cmVkIHlvdXIgYnVuZGxlciB0byBmb3JjZSBzdHJpY3QgbW9kZSBhbmQgYXBwbGllZCBhXG4gIC8vIENTUCB0byBmb3JiaWQgRnVuY3Rpb24sIGFuZCB5b3UncmUgbm90IHdpbGxpbmcgdG8gZml4IGVpdGhlciBvZiB0aG9zZVxuICAvLyBwcm9ibGVtcywgcGxlYXNlIGRldGFpbCB5b3VyIHVuaXF1ZSBwcmVkaWNhbWVudCBpbiBhIEdpdEh1YiBpc3N1ZS5cbiAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSBcIm9iamVjdFwiKSB7XG4gICAgZ2xvYmFsVGhpcy5yZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xuICB9IGVsc2Uge1xuICAgIEZ1bmN0aW9uKFwiclwiLCBcInJlZ2VuZXJhdG9yUnVudGltZSA9IHJcIikocnVudGltZSk7XG4gIH1cbn0iLCJ2YXIgX19kZWZQcm9wID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xudmFyIF9fZXhwb3J0ID0gKHRhcmdldCwgYWxsKSA9PiB7XG4gIGZvciAodmFyIG5hbWUgaW4gYWxsKSBfX2RlZlByb3AodGFyZ2V0LCBuYW1lLCB7XG4gICAgZ2V0OiBhbGxbbmFtZV0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZVxuICB9KTtcbn07XG4vLyBzcmMvdGFza3MvaW5kZXgudHNcbnZhciB0YXNrc19leHBvcnRzID0ge307XG5fX2V4cG9ydCh0YXNrc19leHBvcnRzLCB7XG4gIGF1ZGlvQ2xhc3NpZmljYXRpb246ICgpID0+IGF1ZGlvQ2xhc3NpZmljYXRpb24sXG4gIGF1ZGlvVG9BdWRpbzogKCkgPT4gYXVkaW9Ub0F1ZGlvLFxuICBhdXRvbWF0aWNTcGVlY2hSZWNvZ25pdGlvbjogKCkgPT4gYXV0b21hdGljU3BlZWNoUmVjb2duaXRpb24sXG4gIGNoYXRDb21wbGV0aW9uOiAoKSA9PiBjaGF0Q29tcGxldGlvbixcbiAgY2hhdENvbXBsZXRpb25TdHJlYW06ICgpID0+IGNoYXRDb21wbGV0aW9uU3RyZWFtLFxuICBkb2N1bWVudFF1ZXN0aW9uQW5zd2VyaW5nOiAoKSA9PiBkb2N1bWVudFF1ZXN0aW9uQW5zd2VyaW5nLFxuICBmZWF0dXJlRXh0cmFjdGlvbjogKCkgPT4gZmVhdHVyZUV4dHJhY3Rpb24sXG4gIGZpbGxNYXNrOiAoKSA9PiBmaWxsTWFzayxcbiAgaW1hZ2VDbGFzc2lmaWNhdGlvbjogKCkgPT4gaW1hZ2VDbGFzc2lmaWNhdGlvbixcbiAgaW1hZ2VTZWdtZW50YXRpb246ICgpID0+IGltYWdlU2VnbWVudGF0aW9uLFxuICBpbWFnZVRvSW1hZ2U6ICgpID0+IGltYWdlVG9JbWFnZSxcbiAgaW1hZ2VUb1RleHQ6ICgpID0+IGltYWdlVG9UZXh0LFxuICBvYmplY3REZXRlY3Rpb246ICgpID0+IG9iamVjdERldGVjdGlvbixcbiAgcXVlc3Rpb25BbnN3ZXJpbmc6ICgpID0+IHF1ZXN0aW9uQW5zd2VyaW5nLFxuICByZXF1ZXN0OiAoKSA9PiByZXF1ZXN0LFxuICBzZW50ZW5jZVNpbWlsYXJpdHk6ICgpID0+IHNlbnRlbmNlU2ltaWxhcml0eSxcbiAgc3RyZWFtaW5nUmVxdWVzdDogKCkgPT4gc3RyZWFtaW5nUmVxdWVzdCxcbiAgc3VtbWFyaXphdGlvbjogKCkgPT4gc3VtbWFyaXphdGlvbixcbiAgdGFibGVRdWVzdGlvbkFuc3dlcmluZzogKCkgPT4gdGFibGVRdWVzdGlvbkFuc3dlcmluZyxcbiAgdGFidWxhckNsYXNzaWZpY2F0aW9uOiAoKSA9PiB0YWJ1bGFyQ2xhc3NpZmljYXRpb24sXG4gIHRhYnVsYXJSZWdyZXNzaW9uOiAoKSA9PiB0YWJ1bGFyUmVncmVzc2lvbixcbiAgdGV4dENsYXNzaWZpY2F0aW9uOiAoKSA9PiB0ZXh0Q2xhc3NpZmljYXRpb24sXG4gIHRleHRHZW5lcmF0aW9uOiAoKSA9PiB0ZXh0R2VuZXJhdGlvbixcbiAgdGV4dEdlbmVyYXRpb25TdHJlYW06ICgpID0+IHRleHRHZW5lcmF0aW9uU3RyZWFtLFxuICB0ZXh0VG9JbWFnZTogKCkgPT4gdGV4dFRvSW1hZ2UsXG4gIHRleHRUb1NwZWVjaDogKCkgPT4gdGV4dFRvU3BlZWNoLFxuICB0b2tlbkNsYXNzaWZpY2F0aW9uOiAoKSA9PiB0b2tlbkNsYXNzaWZpY2F0aW9uLFxuICB0cmFuc2xhdGlvbjogKCkgPT4gdHJhbnNsYXRpb24sXG4gIHZpc3VhbFF1ZXN0aW9uQW5zd2VyaW5nOiAoKSA9PiB2aXN1YWxRdWVzdGlvbkFuc3dlcmluZyxcbiAgemVyb1Nob3RDbGFzc2lmaWNhdGlvbjogKCkgPT4gemVyb1Nob3RDbGFzc2lmaWNhdGlvbixcbiAgemVyb1Nob3RJbWFnZUNsYXNzaWZpY2F0aW9uOiAoKSA9PiB6ZXJvU2hvdEltYWdlQ2xhc3NpZmljYXRpb25cbn0pO1xuLy8gc3JjL3V0aWxzL3BpY2sudHNcbmZ1bmN0aW9uIHBpY2sobywgcHJvcHMpIHtcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIC4uLnByb3BzLm1hcChwcm9wID0+IHtcbiAgICBpZiAob1twcm9wXSAhPT0gdm9pZCAwKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBbcHJvcF06IG9bcHJvcF1cbiAgICAgIH07XG4gICAgfVxuICB9KSk7XG59XG4vLyBzcmMvdXRpbHMvdHlwZWRJbmNsdWRlLnRzXG5mdW5jdGlvbiB0eXBlZEluY2x1ZGUoYXJyLCB2KSB7XG4gIHJldHVybiBhcnIuaW5jbHVkZXModik7XG59XG4vLyBzcmMvdXRpbHMvb21pdC50c1xuZnVuY3Rpb24gb21pdChvLCBwcm9wcykge1xuICBjb25zdCBwcm9wc0FyciA9IEFycmF5LmlzQXJyYXkocHJvcHMpID8gcHJvcHMgOiBbcHJvcHNdO1xuICBjb25zdCBsZXRzS2VlcCA9IE9iamVjdC5rZXlzKG8pLmZpbHRlcihwcm9wID0+ICF0eXBlZEluY2x1ZGUocHJvcHNBcnIsIHByb3ApKTtcbiAgcmV0dXJuIHBpY2sobywgbGV0c0tlZXApO1xufVxuLy8gc3JjL2xpYi9pc1VybC50c1xuZnVuY3Rpb24gaXNVcmwobW9kZWxPclVybCkge1xuICByZXR1cm4gL15odHRwKHM/KTovLnRlc3QobW9kZWxPclVybCkgfHwgbW9kZWxPclVybC5zdGFydHNXaXRoKFwiL1wiKTtcbn1cbi8vIHNyYy9saWIvZ2V0RGVmYXVsdFRhc2sudHNcbnZhciB0YXNrQ2FjaGUgPSAvKiBAX19QVVJFX18gKi9uZXcgTWFwKCk7XG52YXIgQ0FDSEVfRFVSQVRJT04gPSAxMCAqIDYwICogMWUzO1xudmFyIE1BWF9DQUNIRV9JVEVNUyA9IDFlMztcbnZhciBIRl9IVUJfVVJMID0gXCJodHRwczovL2h1Z2dpbmdmYWNlLmNvXCI7XG5hc3luYyBmdW5jdGlvbiBnZXREZWZhdWx0VGFzayhtb2RlbCwgYWNjZXNzVG9rZW4sIG9wdGlvbnMpIHtcbiAgaWYgKGlzVXJsKG1vZGVsKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGNvbnN0IGtleSA9IGAke21vZGVsfToke2FjY2Vzc1Rva2VufWA7XG4gIGxldCBjYWNoZWRUYXNrID0gdGFza0NhY2hlLmdldChrZXkpO1xuICBpZiAoY2FjaGVkVGFzayAmJiBjYWNoZWRUYXNrLmRhdGUgPCBuZXcgRGF0ZShEYXRlLm5vdygpIC0gQ0FDSEVfRFVSQVRJT04pKSB7XG4gICAgdGFza0NhY2hlLmRlbGV0ZShrZXkpO1xuICAgIGNhY2hlZFRhc2sgPSB2b2lkIDA7XG4gIH1cbiAgaWYgKGNhY2hlZFRhc2sgPT09IHZvaWQgMCkge1xuICAgIGNvbnN0IG1vZGVsVGFzayA9IGF3YWl0IChvcHRpb25zPy5mZXRjaCA/PyBmZXRjaCkoYCR7SEZfSFVCX1VSTH0vYXBpL21vZGVscy8ke21vZGVsfT9leHBhbmRbXT1waXBlbGluZV90YWdgLCB7XG4gICAgICBoZWFkZXJzOiBhY2Nlc3NUb2tlbiA/IHtcbiAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke2FjY2Vzc1Rva2VufWBcbiAgICAgIH0gOiB7fVxuICAgIH0pLnRoZW4ocmVzcCA9PiByZXNwLmpzb24oKSkudGhlbihqc29uID0+IGpzb24ucGlwZWxpbmVfdGFnKS5jYXRjaCgoKSA9PiBudWxsKTtcbiAgICBpZiAoIW1vZGVsVGFzaykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNhY2hlZFRhc2sgPSB7XG4gICAgICB0YXNrOiBtb2RlbFRhc2ssXG4gICAgICBkYXRlOiAvKiBAX19QVVJFX18gKi9uZXcgRGF0ZSgpXG4gICAgfTtcbiAgICB0YXNrQ2FjaGUuc2V0KGtleSwge1xuICAgICAgdGFzazogbW9kZWxUYXNrLFxuICAgICAgZGF0ZTogLyogQF9fUFVSRV9fICovbmV3IERhdGUoKVxuICAgIH0pO1xuICAgIGlmICh0YXNrQ2FjaGUuc2l6ZSA+IE1BWF9DQUNIRV9JVEVNUykge1xuICAgICAgdGFza0NhY2hlLmRlbGV0ZSh0YXNrQ2FjaGUua2V5cygpLm5leHQoKS52YWx1ZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBjYWNoZWRUYXNrLnRhc2s7XG59XG4vLyBzcmMvbGliL21ha2VSZXF1ZXN0T3B0aW9ucy50c1xudmFyIEhGX0lORkVSRU5DRV9BUElfQkFTRV9VUkwgPSBcImh0dHBzOi8vYXBpLWluZmVyZW5jZS5odWdnaW5nZmFjZS5jb1wiO1xudmFyIHRhc2tzID0gbnVsbDtcbmFzeW5jIGZ1bmN0aW9uIG1ha2VSZXF1ZXN0T3B0aW9ucyhhcmdzLCBvcHRpb25zKSB7XG4gIGNvbnN0IHtcbiAgICBhY2Nlc3NUb2tlbixcbiAgICBlbmRwb2ludFVybCxcbiAgICAuLi5vdGhlckFyZ3NcbiAgfSA9IGFyZ3M7XG4gIGxldCB7XG4gICAgbW9kZWxcbiAgfSA9IGFyZ3M7XG4gIGNvbnN0IHtcbiAgICBmb3JjZVRhc2s6IHRhc2ssXG4gICAgaW5jbHVkZUNyZWRlbnRpYWxzLFxuICAgIHRhc2tIaW50LFxuICAgIHdhaXRfZm9yX21vZGVsLFxuICAgIHVzZV9jYWNoZSxcbiAgICBkb250X2xvYWRfbW9kZWwsXG4gICAgY2hhdENvbXBsZXRpb246IGNoYXRDb21wbGV0aW9uMlxuICB9ID0gb3B0aW9ucyA/PyB7fTtcbiAgY29uc3QgaGVhZGVycyA9IHt9O1xuICBpZiAoYWNjZXNzVG9rZW4pIHtcbiAgICBoZWFkZXJzW1wiQXV0aG9yaXphdGlvblwiXSA9IGBCZWFyZXIgJHthY2Nlc3NUb2tlbn1gO1xuICB9XG4gIGlmICghbW9kZWwgJiYgIXRhc2tzICYmIHRhc2tIaW50KSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYCR7SEZfSFVCX1VSTH0vYXBpL3Rhc2tzYCk7XG4gICAgaWYgKHJlcy5vaykge1xuICAgICAgdGFza3MgPSBhd2FpdCByZXMuanNvbigpO1xuICAgIH1cbiAgfVxuICBpZiAoIW1vZGVsICYmIHRhc2tzICYmIHRhc2tIaW50KSB7XG4gICAgY29uc3QgdGFza0luZm8gPSB0YXNrc1t0YXNrSGludF07XG4gICAgaWYgKHRhc2tJbmZvKSB7XG4gICAgICBtb2RlbCA9IHRhc2tJbmZvLm1vZGVsc1swXS5pZDtcbiAgICB9XG4gIH1cbiAgaWYgKCFtb2RlbCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIk5vIG1vZGVsIHByb3ZpZGVkLCBhbmQgbm8gZGVmYXVsdCBtb2RlbCBmb3VuZCBmb3IgdGhpcyB0YXNrXCIpO1xuICB9XG4gIGNvbnN0IGJpbmFyeSA9IFwiZGF0YVwiIGluIGFyZ3MgJiYgISFhcmdzLmRhdGE7XG4gIGlmICghYmluYXJ5KSB7XG4gICAgaGVhZGVyc1tcIkNvbnRlbnQtVHlwZVwiXSA9IFwiYXBwbGljYXRpb24vanNvblwiO1xuICB9XG4gIGlmICh3YWl0X2Zvcl9tb2RlbCkge1xuICAgIGhlYWRlcnNbXCJYLVdhaXQtRm9yLU1vZGVsXCJdID0gXCJ0cnVlXCI7XG4gIH1cbiAgaWYgKHVzZV9jYWNoZSA9PT0gZmFsc2UpIHtcbiAgICBoZWFkZXJzW1wiWC1Vc2UtQ2FjaGVcIl0gPSBcImZhbHNlXCI7XG4gIH1cbiAgaWYgKGRvbnRfbG9hZF9tb2RlbCkge1xuICAgIGhlYWRlcnNbXCJYLUxvYWQtTW9kZWxcIl0gPSBcIjBcIjtcbiAgfVxuICBsZXQgdXJsID0gKCgpID0+IHtcbiAgICBpZiAoZW5kcG9pbnRVcmwgJiYgaXNVcmwobW9kZWwpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQm90aCBtb2RlbCBhbmQgZW5kcG9pbnRVcmwgY2Fubm90IGJlIFVSTHNcIik7XG4gICAgfVxuICAgIGlmIChpc1VybChtb2RlbCkpIHtcbiAgICAgIGNvbnNvbGUud2FybihcIlVzaW5nIGEgbW9kZWwgVVJMIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgdGhlIGBlbmRwb2ludFVybGAgcGFyYW1ldGVyIGluc3RlYWRcIik7XG4gICAgICByZXR1cm4gbW9kZWw7XG4gICAgfVxuICAgIGlmIChlbmRwb2ludFVybCkge1xuICAgICAgcmV0dXJuIGVuZHBvaW50VXJsO1xuICAgIH1cbiAgICBpZiAodGFzaykge1xuICAgICAgcmV0dXJuIGAke0hGX0lORkVSRU5DRV9BUElfQkFTRV9VUkx9L3BpcGVsaW5lLyR7dGFza30vJHttb2RlbH1gO1xuICAgIH1cbiAgICByZXR1cm4gYCR7SEZfSU5GRVJFTkNFX0FQSV9CQVNFX1VSTH0vbW9kZWxzLyR7bW9kZWx9YDtcbiAgfSkoKTtcbiAgaWYgKGNoYXRDb21wbGV0aW9uMiAmJiAhdXJsLmVuZHNXaXRoKFwiL2NoYXQvY29tcGxldGlvbnNcIikpIHtcbiAgICB1cmwgKz0gXCIvdjEvY2hhdC9jb21wbGV0aW9uc1wiO1xuICB9XG4gIGxldCBjcmVkZW50aWFscztcbiAgaWYgKHR5cGVvZiBpbmNsdWRlQ3JlZGVudGlhbHMgPT09IFwic3RyaW5nXCIpIHtcbiAgICBjcmVkZW50aWFscyA9IGluY2x1ZGVDcmVkZW50aWFscztcbiAgfSBlbHNlIGlmIChpbmNsdWRlQ3JlZGVudGlhbHMgPT09IHRydWUpIHtcbiAgICBjcmVkZW50aWFscyA9IFwiaW5jbHVkZVwiO1xuICB9XG4gIGNvbnN0IGluZm8gPSB7XG4gICAgaGVhZGVycyxcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIGJvZHk6IGJpbmFyeSA/IGFyZ3MuZGF0YSA6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIC4uLihvdGhlckFyZ3MubW9kZWwgJiYgaXNVcmwob3RoZXJBcmdzLm1vZGVsKSA/IG9taXQob3RoZXJBcmdzLCBcIm1vZGVsXCIpIDogb3RoZXJBcmdzKVxuICAgIH0pLFxuICAgIC4uLihjcmVkZW50aWFscyAmJiB7XG4gICAgICBjcmVkZW50aWFsc1xuICAgIH0pLFxuICAgIHNpZ25hbDogb3B0aW9ucz8uc2lnbmFsXG4gIH07XG4gIHJldHVybiB7XG4gICAgdXJsLFxuICAgIGluZm9cbiAgfTtcbn1cbi8vIHNyYy90YXNrcy9jdXN0b20vcmVxdWVzdC50c1xuYXN5bmMgZnVuY3Rpb24gcmVxdWVzdChhcmdzLCBvcHRpb25zKSB7XG4gIGNvbnN0IHtcbiAgICB1cmwsXG4gICAgaW5mb1xuICB9ID0gYXdhaXQgbWFrZVJlcXVlc3RPcHRpb25zKGFyZ3MsIG9wdGlvbnMpO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IChvcHRpb25zPy5mZXRjaCA/PyBmZXRjaCkodXJsLCBpbmZvKTtcbiAgaWYgKG9wdGlvbnM/LnJldHJ5X29uX2Vycm9yICE9PSBmYWxzZSAmJiByZXNwb25zZS5zdGF0dXMgPT09IDUwMyAmJiAhb3B0aW9ucz8ud2FpdF9mb3JfbW9kZWwpIHtcbiAgICByZXR1cm4gcmVxdWVzdChhcmdzLCB7XG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgd2FpdF9mb3JfbW9kZWw6IHRydWVcbiAgICB9KTtcbiAgfVxuICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgaWYgKHJlc3BvbnNlLmhlYWRlcnMuZ2V0KFwiQ29udGVudC1UeXBlXCIpPy5zdGFydHNXaXRoKFwiYXBwbGljYXRpb24vanNvblwiKSkge1xuICAgICAgY29uc3Qgb3V0cHV0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgaWYgKFs0MDAsIDQyMiwgNDA0LCA1MDBdLmluY2x1ZGVzKHJlc3BvbnNlLnN0YXR1cykgJiYgb3B0aW9ucz8uY2hhdENvbXBsZXRpb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBTZXJ2ZXIgJHthcmdzLm1vZGVsfSBkb2VzIG5vdCBzZWVtIHRvIHN1cHBvcnQgY2hhdCBjb21wbGV0aW9uLiBFcnJvcjogJHtvdXRwdXQuZXJyb3J9YCk7XG4gICAgICB9XG4gICAgICBpZiAob3V0cHV0LmVycm9yKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeShvdXRwdXQuZXJyb3IpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgZmV0Y2hpbmcgdGhlIGJsb2JcIik7XG4gIH1cbiAgaWYgKHJlc3BvbnNlLmhlYWRlcnMuZ2V0KFwiQ29udGVudC1UeXBlXCIpPy5zdGFydHNXaXRoKFwiYXBwbGljYXRpb24vanNvblwiKSkge1xuICAgIHJldHVybiBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gIH1cbiAgcmV0dXJuIGF3YWl0IHJlc3BvbnNlLmJsb2IoKTtcbn1cbi8vIHNyYy92ZW5kb3IvZmV0Y2gtZXZlbnQtc291cmNlL3BhcnNlLnRzXG5mdW5jdGlvbiBnZXRMaW5lcyhvbkxpbmUpIHtcbiAgbGV0IGJ1ZmZlcjtcbiAgbGV0IHBvc2l0aW9uO1xuICBsZXQgZmllbGRMZW5ndGg7XG4gIGxldCBkaXNjYXJkVHJhaWxpbmdOZXdsaW5lID0gZmFsc2U7XG4gIHJldHVybiBmdW5jdGlvbiBvbkNodW5rKGFycikge1xuICAgIGlmIChidWZmZXIgPT09IHZvaWQgMCkge1xuICAgICAgYnVmZmVyID0gYXJyO1xuICAgICAgcG9zaXRpb24gPSAwO1xuICAgICAgZmllbGRMZW5ndGggPSAtMTtcbiAgICB9IGVsc2Uge1xuICAgICAgYnVmZmVyID0gY29uY2F0KGJ1ZmZlciwgYXJyKTtcbiAgICB9XG4gICAgY29uc3QgYnVmTGVuZ3RoID0gYnVmZmVyLmxlbmd0aDtcbiAgICBsZXQgbGluZVN0YXJ0ID0gMDtcbiAgICB3aGlsZSAocG9zaXRpb24gPCBidWZMZW5ndGgpIHtcbiAgICAgIGlmIChkaXNjYXJkVHJhaWxpbmdOZXdsaW5lKSB7XG4gICAgICAgIGlmIChidWZmZXJbcG9zaXRpb25dID09PSAxMCAvKiBOZXdMaW5lICovKSB7XG4gICAgICAgICAgbGluZVN0YXJ0ID0gKytwb3NpdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBkaXNjYXJkVHJhaWxpbmdOZXdsaW5lID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBsZXQgbGluZUVuZCA9IC0xO1xuICAgICAgZm9yICg7IHBvc2l0aW9uIDwgYnVmTGVuZ3RoICYmIGxpbmVFbmQgPT09IC0xOyArK3Bvc2l0aW9uKSB7XG4gICAgICAgIHN3aXRjaCAoYnVmZmVyW3Bvc2l0aW9uXSkge1xuICAgICAgICAgIGNhc2UgNTggLyogQ29sb24gKi86XG4gICAgICAgICAgICBpZiAoZmllbGRMZW5ndGggPT09IC0xKSB7XG4gICAgICAgICAgICAgIGZpZWxkTGVuZ3RoID0gcG9zaXRpb24gLSBsaW5lU3RhcnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDEzIC8qIENhcnJpYWdlUmV0dXJuICovOlxuICAgICAgICAgICAgZGlzY2FyZFRyYWlsaW5nTmV3bGluZSA9IHRydWU7XG4gICAgICAgICAgY2FzZSAxMCAvKiBOZXdMaW5lICovOlxuICAgICAgICAgICAgbGluZUVuZCA9IHBvc2l0aW9uO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChsaW5lRW5kID09PSAtMSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIG9uTGluZShidWZmZXIuc3ViYXJyYXkobGluZVN0YXJ0LCBsaW5lRW5kKSwgZmllbGRMZW5ndGgpO1xuICAgICAgbGluZVN0YXJ0ID0gcG9zaXRpb247XG4gICAgICBmaWVsZExlbmd0aCA9IC0xO1xuICAgIH1cbiAgICBpZiAobGluZVN0YXJ0ID09PSBidWZMZW5ndGgpIHtcbiAgICAgIGJ1ZmZlciA9IHZvaWQgMDtcbiAgICB9IGVsc2UgaWYgKGxpbmVTdGFydCAhPT0gMCkge1xuICAgICAgYnVmZmVyID0gYnVmZmVyLnN1YmFycmF5KGxpbmVTdGFydCk7XG4gICAgICBwb3NpdGlvbiAtPSBsaW5lU3RhcnQ7XG4gICAgfVxuICB9O1xufVxuZnVuY3Rpb24gZ2V0TWVzc2FnZXMob25JZCwgb25SZXRyeSwgb25NZXNzYWdlKSB7XG4gIGxldCBtZXNzYWdlID0gbmV3TWVzc2FnZSgpO1xuICBjb25zdCBkZWNvZGVyID0gbmV3IFRleHREZWNvZGVyKCk7XG4gIHJldHVybiBmdW5jdGlvbiBvbkxpbmUobGluZSwgZmllbGRMZW5ndGgpIHtcbiAgICBpZiAobGluZS5sZW5ndGggPT09IDApIHtcbiAgICAgIG9uTWVzc2FnZT8uKG1lc3NhZ2UpO1xuICAgICAgbWVzc2FnZSA9IG5ld01lc3NhZ2UoKTtcbiAgICB9IGVsc2UgaWYgKGZpZWxkTGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgZmllbGQgPSBkZWNvZGVyLmRlY29kZShsaW5lLnN1YmFycmF5KDAsIGZpZWxkTGVuZ3RoKSk7XG4gICAgICBjb25zdCB2YWx1ZU9mZnNldCA9IGZpZWxkTGVuZ3RoICsgKGxpbmVbZmllbGRMZW5ndGggKyAxXSA9PT0gMzIgLyogU3BhY2UgKi8gPyAyIDogMSk7XG4gICAgICBjb25zdCB2YWx1ZSA9IGRlY29kZXIuZGVjb2RlKGxpbmUuc3ViYXJyYXkodmFsdWVPZmZzZXQpKTtcbiAgICAgIHN3aXRjaCAoZmllbGQpIHtcbiAgICAgICAgY2FzZSBcImRhdGFcIjpcbiAgICAgICAgICBtZXNzYWdlLmRhdGEgPSBtZXNzYWdlLmRhdGEgPyBtZXNzYWdlLmRhdGEgKyBcIlxcblwiICsgdmFsdWUgOiB2YWx1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImV2ZW50XCI6XG4gICAgICAgICAgbWVzc2FnZS5ldmVudCA9IHZhbHVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiaWRcIjpcbiAgICAgICAgICBvbklkKG1lc3NhZ2UuaWQgPSB2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJyZXRyeVwiOlxuICAgICAgICAgIGNvbnN0IHJldHJ5ID0gcGFyc2VJbnQodmFsdWUsIDEwKTtcbiAgICAgICAgICBpZiAoIWlzTmFOKHJldHJ5KSkge1xuICAgICAgICAgICAgb25SZXRyeShtZXNzYWdlLnJldHJ5ID0gcmV0cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG5mdW5jdGlvbiBjb25jYXQoYSwgYikge1xuICBjb25zdCByZXMgPSBuZXcgVWludDhBcnJheShhLmxlbmd0aCArIGIubGVuZ3RoKTtcbiAgcmVzLnNldChhKTtcbiAgcmVzLnNldChiLCBhLmxlbmd0aCk7XG4gIHJldHVybiByZXM7XG59XG5mdW5jdGlvbiBuZXdNZXNzYWdlKCkge1xuICByZXR1cm4ge1xuICAgIGRhdGE6IFwiXCIsXG4gICAgZXZlbnQ6IFwiXCIsXG4gICAgaWQ6IFwiXCIsXG4gICAgcmV0cnk6IHZvaWQgMFxuICB9O1xufVxuLy8gc3JjL3Rhc2tzL2N1c3RvbS9zdHJlYW1pbmdSZXF1ZXN0LnRzXG5hc3luYyBmdW5jdGlvbiogc3RyZWFtaW5nUmVxdWVzdChhcmdzLCBvcHRpb25zKSB7XG4gIGNvbnN0IHtcbiAgICB1cmwsXG4gICAgaW5mb1xuICB9ID0gYXdhaXQgbWFrZVJlcXVlc3RPcHRpb25zKHtcbiAgICAuLi5hcmdzLFxuICAgIHN0cmVhbTogdHJ1ZVxuICB9LCBvcHRpb25zKTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCAob3B0aW9ucz8uZmV0Y2ggPz8gZmV0Y2gpKHVybCwgaW5mbyk7XG4gIGlmIChvcHRpb25zPy5yZXRyeV9vbl9lcnJvciAhPT0gZmFsc2UgJiYgcmVzcG9uc2Uuc3RhdHVzID09PSA1MDMgJiYgIW9wdGlvbnM/LndhaXRfZm9yX21vZGVsKSB7XG4gICAgcmV0dXJuIHlpZWxkKiBzdHJlYW1pbmdSZXF1ZXN0KGFyZ3MsIHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICB3YWl0X2Zvcl9tb2RlbDogdHJ1ZVxuICAgIH0pO1xuICB9XG4gIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICBpZiAocmVzcG9uc2UuaGVhZGVycy5nZXQoXCJDb250ZW50LVR5cGVcIik/LnN0YXJ0c1dpdGgoXCJhcHBsaWNhdGlvbi9qc29uXCIpKSB7XG4gICAgICBjb25zdCBvdXRwdXQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICBpZiAoWzQwMCwgNDIyLCA0MDQsIDUwMF0uaW5jbHVkZXMocmVzcG9uc2Uuc3RhdHVzKSAmJiBvcHRpb25zPy5jaGF0Q29tcGxldGlvbikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFNlcnZlciAke2FyZ3MubW9kZWx9IGRvZXMgbm90IHNlZW0gdG8gc3VwcG9ydCBjaGF0IGNvbXBsZXRpb24uIEVycm9yOiAke291dHB1dC5lcnJvcn1gKTtcbiAgICAgIH1cbiAgICAgIGlmIChvdXRwdXQuZXJyb3IpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG91dHB1dC5lcnJvcik7XG4gICAgICB9XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcihgU2VydmVyIHJlc3BvbnNlIGNvbnRhaW5zIGVycm9yOiAke3Jlc3BvbnNlLnN0YXR1c31gKTtcbiAgfVxuICBpZiAoIXJlc3BvbnNlLmhlYWRlcnMuZ2V0KFwiY29udGVudC10eXBlXCIpPy5zdGFydHNXaXRoKFwidGV4dC9ldmVudC1zdHJlYW1cIikpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFNlcnZlciBkb2VzIG5vdCBzdXBwb3J0IGV2ZW50IHN0cmVhbSBjb250ZW50IHR5cGUsIGl0IHJldHVybmVkIGAgKyByZXNwb25zZS5oZWFkZXJzLmdldChcImNvbnRlbnQtdHlwZVwiKSk7XG4gIH1cbiAgaWYgKCFyZXNwb25zZS5ib2R5KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IHJlYWRlciA9IHJlc3BvbnNlLmJvZHkuZ2V0UmVhZGVyKCk7XG4gIGxldCBldmVudHMgPSBbXTtcbiAgY29uc3Qgb25FdmVudCA9IGV2ZW50ID0+IHtcbiAgICBldmVudHMucHVzaChldmVudCk7XG4gIH07XG4gIGNvbnN0IG9uQ2h1bmsgPSBnZXRMaW5lcyhnZXRNZXNzYWdlcygoKSA9PiB7fSwgKCkgPT4ge30sIG9uRXZlbnQpKTtcbiAgdHJ5IHtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBkb25lLFxuICAgICAgICB2YWx1ZVxuICAgICAgfSA9IGF3YWl0IHJlYWRlci5yZWFkKCk7XG4gICAgICBpZiAoZG9uZSkgcmV0dXJuO1xuICAgICAgb25DaHVuayh2YWx1ZSk7XG4gICAgICBmb3IgKGNvbnN0IGV2ZW50IG9mIGV2ZW50cykge1xuICAgICAgICBpZiAoZXZlbnQuZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgaWYgKGV2ZW50LmRhdGEgPT09IFwiW0RPTkVdXCIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UoZXZlbnQuZGF0YSk7XG4gICAgICAgICAgaWYgKHR5cGVvZiBkYXRhID09PSBcIm9iamVjdFwiICYmIGRhdGEgIT09IG51bGwgJiYgXCJlcnJvclwiIGluIGRhdGEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihkYXRhLmVycm9yKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgeWllbGQgZGF0YTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZXZlbnRzID0gW107XG4gICAgfVxuICB9IGZpbmFsbHkge1xuICAgIHJlYWRlci5yZWxlYXNlTG9jaygpO1xuICB9XG59XG4vLyBzcmMvbGliL0luZmVyZW5jZU91dHB1dEVycm9yLnRzXG52YXIgSW5mZXJlbmNlT3V0cHV0RXJyb3IgPSBjbGFzcyBleHRlbmRzIFR5cGVFcnJvciB7XG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2UpIHtcbiAgICBzdXBlcihgSW52YWxpZCBpbmZlcmVuY2Ugb3V0cHV0OiAke21lc3NhZ2V9LiBVc2UgdGhlICdyZXF1ZXN0JyBtZXRob2Qgd2l0aCB0aGUgc2FtZSBwYXJhbWV0ZXJzIHRvIGRvIGEgY3VzdG9tIGNhbGwgd2l0aCBubyB0eXBlIGNoZWNraW5nLmApO1xuICAgIHRoaXMubmFtZSA9IFwiSW5mZXJlbmNlT3V0cHV0RXJyb3JcIjtcbiAgfVxufTtcbi8vIHNyYy90YXNrcy9hdWRpby9hdWRpb0NsYXNzaWZpY2F0aW9uLnRzXG5hc3luYyBmdW5jdGlvbiBhdWRpb0NsYXNzaWZpY2F0aW9uKGFyZ3MsIG9wdGlvbnMpIHtcbiAgY29uc3QgcmVzID0gYXdhaXQgcmVxdWVzdChhcmdzLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICB0YXNrSGludDogXCJhdWRpby1jbGFzc2lmaWNhdGlvblwiXG4gIH0pO1xuICBjb25zdCBpc1ZhbGlkT3V0cHV0ID0gQXJyYXkuaXNBcnJheShyZXMpICYmIHJlcy5ldmVyeSh4ID0+IHR5cGVvZiB4LmxhYmVsID09PSBcInN0cmluZ1wiICYmIHR5cGVvZiB4LnNjb3JlID09PSBcIm51bWJlclwiKTtcbiAgaWYgKCFpc1ZhbGlkT3V0cHV0KSB7XG4gICAgdGhyb3cgbmV3IEluZmVyZW5jZU91dHB1dEVycm9yKFwiRXhwZWN0ZWQgQXJyYXk8e2xhYmVsOiBzdHJpbmcsIHNjb3JlOiBudW1iZXJ9PlwiKTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuLy8gc3JjL3Rhc2tzL2F1ZGlvL2F1dG9tYXRpY1NwZWVjaFJlY29nbml0aW9uLnRzXG5hc3luYyBmdW5jdGlvbiBhdXRvbWF0aWNTcGVlY2hSZWNvZ25pdGlvbihhcmdzLCBvcHRpb25zKSB7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IHJlcXVlc3QoYXJncywge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgdGFza0hpbnQ6IFwiYXV0b21hdGljLXNwZWVjaC1yZWNvZ25pdGlvblwiXG4gIH0pO1xuICBjb25zdCBpc1ZhbGlkT3V0cHV0ID0gdHlwZW9mIHJlcz8udGV4dCA9PT0gXCJzdHJpbmdcIjtcbiAgaWYgKCFpc1ZhbGlkT3V0cHV0KSB7XG4gICAgdGhyb3cgbmV3IEluZmVyZW5jZU91dHB1dEVycm9yKFwiRXhwZWN0ZWQge3RleHQ6IHN0cmluZ31cIik7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cbi8vIHNyYy90YXNrcy9hdWRpby90ZXh0VG9TcGVlY2gudHNcbmFzeW5jIGZ1bmN0aW9uIHRleHRUb1NwZWVjaChhcmdzLCBvcHRpb25zKSB7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IHJlcXVlc3QoYXJncywge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgdGFza0hpbnQ6IFwidGV4dC10by1zcGVlY2hcIlxuICB9KTtcbiAgY29uc3QgaXNWYWxpZE91dHB1dCA9IHJlcyAmJiByZXMgaW5zdGFuY2VvZiBCbG9iO1xuICBpZiAoIWlzVmFsaWRPdXRwdXQpIHtcbiAgICB0aHJvdyBuZXcgSW5mZXJlbmNlT3V0cHV0RXJyb3IoXCJFeHBlY3RlZCBCbG9iXCIpO1xuICB9XG4gIHJldHVybiByZXM7XG59XG4vLyBzcmMvdGFza3MvYXVkaW8vYXVkaW9Ub0F1ZGlvLnRzXG5hc3luYyBmdW5jdGlvbiBhdWRpb1RvQXVkaW8oYXJncywgb3B0aW9ucykge1xuICBjb25zdCByZXMgPSBhd2FpdCByZXF1ZXN0KGFyZ3MsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIHRhc2tIaW50OiBcImF1ZGlvLXRvLWF1ZGlvXCJcbiAgfSk7XG4gIGNvbnN0IGlzVmFsaWRPdXRwdXQgPSBBcnJheS5pc0FycmF5KHJlcykgJiYgcmVzLmV2ZXJ5KHggPT4gdHlwZW9mIHgubGFiZWwgPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIHguYmxvYiA9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgeFtcImNvbnRlbnQtdHlwZVwiXSA9PT0gXCJzdHJpbmdcIik7XG4gIGlmICghaXNWYWxpZE91dHB1dCkge1xuICAgIHRocm93IG5ldyBJbmZlcmVuY2VPdXRwdXRFcnJvcihcIkV4cGVjdGVkIEFycmF5PHtsYWJlbDogc3RyaW5nLCBibG9iOiBzdHJpbmcsIGNvbnRlbnQtdHlwZTogc3RyaW5nfT5cIik7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cbi8vIHNyYy90YXNrcy9jdi9pbWFnZUNsYXNzaWZpY2F0aW9uLnRzXG5hc3luYyBmdW5jdGlvbiBpbWFnZUNsYXNzaWZpY2F0aW9uKGFyZ3MsIG9wdGlvbnMpIHtcbiAgY29uc3QgcmVzID0gYXdhaXQgcmVxdWVzdChhcmdzLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICB0YXNrSGludDogXCJpbWFnZS1jbGFzc2lmaWNhdGlvblwiXG4gIH0pO1xuICBjb25zdCBpc1ZhbGlkT3V0cHV0ID0gQXJyYXkuaXNBcnJheShyZXMpICYmIHJlcy5ldmVyeSh4ID0+IHR5cGVvZiB4LmxhYmVsID09PSBcInN0cmluZ1wiICYmIHR5cGVvZiB4LnNjb3JlID09PSBcIm51bWJlclwiKTtcbiAgaWYgKCFpc1ZhbGlkT3V0cHV0KSB7XG4gICAgdGhyb3cgbmV3IEluZmVyZW5jZU91dHB1dEVycm9yKFwiRXhwZWN0ZWQgQXJyYXk8e2xhYmVsOiBzdHJpbmcsIHNjb3JlOiBudW1iZXJ9PlwiKTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuLy8gc3JjL3Rhc2tzL2N2L2ltYWdlU2VnbWVudGF0aW9uLnRzXG5hc3luYyBmdW5jdGlvbiBpbWFnZVNlZ21lbnRhdGlvbihhcmdzLCBvcHRpb25zKSB7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IHJlcXVlc3QoYXJncywge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgdGFza0hpbnQ6IFwiaW1hZ2Utc2VnbWVudGF0aW9uXCJcbiAgfSk7XG4gIGNvbnN0IGlzVmFsaWRPdXRwdXQgPSBBcnJheS5pc0FycmF5KHJlcykgJiYgcmVzLmV2ZXJ5KHggPT4gdHlwZW9mIHgubGFiZWwgPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIHgubWFzayA9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgeC5zY29yZSA9PT0gXCJudW1iZXJcIik7XG4gIGlmICghaXNWYWxpZE91dHB1dCkge1xuICAgIHRocm93IG5ldyBJbmZlcmVuY2VPdXRwdXRFcnJvcihcIkV4cGVjdGVkIEFycmF5PHtsYWJlbDogc3RyaW5nLCBtYXNrOiBzdHJpbmcsIHNjb3JlOiBudW1iZXJ9PlwiKTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuLy8gc3JjL3Rhc2tzL2N2L2ltYWdlVG9UZXh0LnRzXG5hc3luYyBmdW5jdGlvbiBpbWFnZVRvVGV4dChhcmdzLCBvcHRpb25zKSB7XG4gIGNvbnN0IHJlcyA9IChhd2FpdCByZXF1ZXN0KGFyZ3MsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIHRhc2tIaW50OiBcImltYWdlLXRvLXRleHRcIlxuICB9KSk/LlswXTtcbiAgaWYgKHR5cGVvZiByZXM/LmdlbmVyYXRlZF90ZXh0ICE9PSBcInN0cmluZ1wiKSB7XG4gICAgdGhyb3cgbmV3IEluZmVyZW5jZU91dHB1dEVycm9yKFwiRXhwZWN0ZWQge2dlbmVyYXRlZF90ZXh0OiBzdHJpbmd9XCIpO1xuICB9XG4gIHJldHVybiByZXM7XG59XG4vLyBzcmMvdGFza3MvY3Yvb2JqZWN0RGV0ZWN0aW9uLnRzXG5hc3luYyBmdW5jdGlvbiBvYmplY3REZXRlY3Rpb24oYXJncywgb3B0aW9ucykge1xuICBjb25zdCByZXMgPSBhd2FpdCByZXF1ZXN0KGFyZ3MsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIHRhc2tIaW50OiBcIm9iamVjdC1kZXRlY3Rpb25cIlxuICB9KTtcbiAgY29uc3QgaXNWYWxpZE91dHB1dCA9IEFycmF5LmlzQXJyYXkocmVzKSAmJiByZXMuZXZlcnkoeCA9PiB0eXBlb2YgeC5sYWJlbCA9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgeC5zY29yZSA9PT0gXCJudW1iZXJcIiAmJiB0eXBlb2YgeC5ib3gueG1pbiA9PT0gXCJudW1iZXJcIiAmJiB0eXBlb2YgeC5ib3gueW1pbiA9PT0gXCJudW1iZXJcIiAmJiB0eXBlb2YgeC5ib3gueG1heCA9PT0gXCJudW1iZXJcIiAmJiB0eXBlb2YgeC5ib3gueW1heCA9PT0gXCJudW1iZXJcIik7XG4gIGlmICghaXNWYWxpZE91dHB1dCkge1xuICAgIHRocm93IG5ldyBJbmZlcmVuY2VPdXRwdXRFcnJvcihcIkV4cGVjdGVkIEFycmF5PHtsYWJlbDpzdHJpbmc7IHNjb3JlOm51bWJlcjsgYm94Ont4bWluOm51bWJlcjsgeW1pbjpudW1iZXI7IHhtYXg6bnVtYmVyOyB5bWF4Om51bWJlcn19PlwiKTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuLy8gc3JjL3Rhc2tzL2N2L3RleHRUb0ltYWdlLnRzXG5hc3luYyBmdW5jdGlvbiB0ZXh0VG9JbWFnZShhcmdzLCBvcHRpb25zKSB7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IHJlcXVlc3QoYXJncywge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgdGFza0hpbnQ6IFwidGV4dC10by1pbWFnZVwiXG4gIH0pO1xuICBjb25zdCBpc1ZhbGlkT3V0cHV0ID0gcmVzICYmIHJlcyBpbnN0YW5jZW9mIEJsb2I7XG4gIGlmICghaXNWYWxpZE91dHB1dCkge1xuICAgIHRocm93IG5ldyBJbmZlcmVuY2VPdXRwdXRFcnJvcihcIkV4cGVjdGVkIEJsb2JcIik7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cbi8vIHNyYy91dGlscy9iYXNlNjRGcm9tQnl0ZXMudHNcbmZ1bmN0aW9uIGJhc2U2NEZyb21CeXRlcyhhcnIpIHtcbiAgaWYgKGdsb2JhbFRoaXMuQnVmZmVyKSB7XG4gICAgcmV0dXJuIGdsb2JhbFRoaXMuQnVmZmVyLmZyb20oYXJyKS50b1N0cmluZyhcImJhc2U2NFwiKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBiaW4gPSBbXTtcbiAgICBhcnIuZm9yRWFjaChieXRlID0+IHtcbiAgICAgIGJpbi5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZSkpO1xuICAgIH0pO1xuICAgIHJldHVybiBnbG9iYWxUaGlzLmJ0b2EoYmluLmpvaW4oXCJcIikpO1xuICB9XG59XG4vLyBzcmMvdGFza3MvY3YvaW1hZ2VUb0ltYWdlLnRzXG5hc3luYyBmdW5jdGlvbiBpbWFnZVRvSW1hZ2UoYXJncywgb3B0aW9ucykge1xuICBsZXQgcmVxQXJncztcbiAgaWYgKCFhcmdzLnBhcmFtZXRlcnMpIHtcbiAgICByZXFBcmdzID0ge1xuICAgICAgYWNjZXNzVG9rZW46IGFyZ3MuYWNjZXNzVG9rZW4sXG4gICAgICBtb2RlbDogYXJncy5tb2RlbCxcbiAgICAgIGRhdGE6IGFyZ3MuaW5wdXRzXG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICByZXFBcmdzID0ge1xuICAgICAgLi4uYXJncyxcbiAgICAgIGlucHV0czogYmFzZTY0RnJvbUJ5dGVzKG5ldyBVaW50OEFycmF5KGFyZ3MuaW5wdXRzIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIgPyBhcmdzLmlucHV0cyA6IGF3YWl0IGFyZ3MuaW5wdXRzLmFycmF5QnVmZmVyKCkpKVxuICAgIH07XG4gIH1cbiAgY29uc3QgcmVzID0gYXdhaXQgcmVxdWVzdChyZXFBcmdzLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICB0YXNrSGludDogXCJpbWFnZS10by1pbWFnZVwiXG4gIH0pO1xuICBjb25zdCBpc1ZhbGlkT3V0cHV0ID0gcmVzICYmIHJlcyBpbnN0YW5jZW9mIEJsb2I7XG4gIGlmICghaXNWYWxpZE91dHB1dCkge1xuICAgIHRocm93IG5ldyBJbmZlcmVuY2VPdXRwdXRFcnJvcihcIkV4cGVjdGVkIEJsb2JcIik7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cbi8vIHNyYy90YXNrcy9jdi96ZXJvU2hvdEltYWdlQ2xhc3NpZmljYXRpb24udHNcbmFzeW5jIGZ1bmN0aW9uIHplcm9TaG90SW1hZ2VDbGFzc2lmaWNhdGlvbihhcmdzLCBvcHRpb25zKSB7XG4gIGNvbnN0IHJlcUFyZ3MgPSB7XG4gICAgLi4uYXJncyxcbiAgICBpbnB1dHM6IHtcbiAgICAgIGltYWdlOiBiYXNlNjRGcm9tQnl0ZXMobmV3IFVpbnQ4QXJyYXkoYXJncy5pbnB1dHMuaW1hZ2UgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlciA/IGFyZ3MuaW5wdXRzLmltYWdlIDogYXdhaXQgYXJncy5pbnB1dHMuaW1hZ2UuYXJyYXlCdWZmZXIoKSkpXG4gICAgfVxuICB9O1xuICBjb25zdCByZXMgPSBhd2FpdCByZXF1ZXN0KHJlcUFyZ3MsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIHRhc2tIaW50OiBcInplcm8tc2hvdC1pbWFnZS1jbGFzc2lmaWNhdGlvblwiXG4gIH0pO1xuICBjb25zdCBpc1ZhbGlkT3V0cHV0ID0gQXJyYXkuaXNBcnJheShyZXMpICYmIHJlcy5ldmVyeSh4ID0+IHR5cGVvZiB4LmxhYmVsID09PSBcInN0cmluZ1wiICYmIHR5cGVvZiB4LnNjb3JlID09PSBcIm51bWJlclwiKTtcbiAgaWYgKCFpc1ZhbGlkT3V0cHV0KSB7XG4gICAgdGhyb3cgbmV3IEluZmVyZW5jZU91dHB1dEVycm9yKFwiRXhwZWN0ZWQgQXJyYXk8e2xhYmVsOiBzdHJpbmcsIHNjb3JlOiBudW1iZXJ9PlwiKTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuLy8gc3JjL3Rhc2tzL25scC9mZWF0dXJlRXh0cmFjdGlvbi50c1xuYXN5bmMgZnVuY3Rpb24gZmVhdHVyZUV4dHJhY3Rpb24oYXJncywgb3B0aW9ucykge1xuICBjb25zdCBkZWZhdWx0VGFzayA9IGFyZ3MubW9kZWwgPyBhd2FpdCBnZXREZWZhdWx0VGFzayhhcmdzLm1vZGVsLCBhcmdzLmFjY2Vzc1Rva2VuLCBvcHRpb25zKSA6IHZvaWQgMDtcbiAgY29uc3QgcmVzID0gYXdhaXQgcmVxdWVzdChhcmdzLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICB0YXNrSGludDogXCJmZWF0dXJlLWV4dHJhY3Rpb25cIixcbiAgICAuLi4oZGVmYXVsdFRhc2sgPT09IFwic2VudGVuY2Utc2ltaWxhcml0eVwiICYmIHtcbiAgICAgIGZvcmNlVGFzazogXCJmZWF0dXJlLWV4dHJhY3Rpb25cIlxuICAgIH0pXG4gIH0pO1xuICBsZXQgaXNWYWxpZE91dHB1dCA9IHRydWU7XG4gIGNvbnN0IGlzTnVtQXJyYXlSZWMgPSAoYXJyLCBtYXhEZXB0aCwgY3VyRGVwdGggPSAwKSA9PiB7XG4gICAgaWYgKGN1ckRlcHRoID4gbWF4RGVwdGgpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoYXJyLmV2ZXJ5KHggPT4gQXJyYXkuaXNBcnJheSh4KSkpIHtcbiAgICAgIHJldHVybiBhcnIuZXZlcnkoeCA9PiBpc051bUFycmF5UmVjKHgsIG1heERlcHRoLCBjdXJEZXB0aCArIDEpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGFyci5ldmVyeSh4ID0+IHR5cGVvZiB4ID09PSBcIm51bWJlclwiKTtcbiAgICB9XG4gIH07XG4gIGlzVmFsaWRPdXRwdXQgPSBBcnJheS5pc0FycmF5KHJlcykgJiYgaXNOdW1BcnJheVJlYyhyZXMsIDMsIDApO1xuICBpZiAoIWlzVmFsaWRPdXRwdXQpIHtcbiAgICB0aHJvdyBuZXcgSW5mZXJlbmNlT3V0cHV0RXJyb3IoXCJFeHBlY3RlZCBBcnJheTxudW1iZXJbXVtdW10gfCBudW1iZXJbXVtdIHwgbnVtYmVyW10gfCBudW1iZXI+XCIpO1xuICB9XG4gIHJldHVybiByZXM7XG59XG4vLyBzcmMvdGFza3MvbmxwL2ZpbGxNYXNrLnRzXG5hc3luYyBmdW5jdGlvbiBmaWxsTWFzayhhcmdzLCBvcHRpb25zKSB7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IHJlcXVlc3QoYXJncywge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgdGFza0hpbnQ6IFwiZmlsbC1tYXNrXCJcbiAgfSk7XG4gIGNvbnN0IGlzVmFsaWRPdXRwdXQgPSBBcnJheS5pc0FycmF5KHJlcykgJiYgcmVzLmV2ZXJ5KHggPT4gdHlwZW9mIHguc2NvcmUgPT09IFwibnVtYmVyXCIgJiYgdHlwZW9mIHguc2VxdWVuY2UgPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIHgudG9rZW4gPT09IFwibnVtYmVyXCIgJiYgdHlwZW9mIHgudG9rZW5fc3RyID09PSBcInN0cmluZ1wiKTtcbiAgaWYgKCFpc1ZhbGlkT3V0cHV0KSB7XG4gICAgdGhyb3cgbmV3IEluZmVyZW5jZU91dHB1dEVycm9yKFwiRXhwZWN0ZWQgQXJyYXk8e3Njb3JlOiBudW1iZXIsIHNlcXVlbmNlOiBzdHJpbmcsIHRva2VuOiBudW1iZXIsIHRva2VuX3N0cjogc3RyaW5nfT5cIik7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cbi8vIHNyYy90YXNrcy9ubHAvcXVlc3Rpb25BbnN3ZXJpbmcudHNcbmFzeW5jIGZ1bmN0aW9uIHF1ZXN0aW9uQW5zd2VyaW5nKGFyZ3MsIG9wdGlvbnMpIHtcbiAgY29uc3QgcmVzID0gYXdhaXQgcmVxdWVzdChhcmdzLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICB0YXNrSGludDogXCJxdWVzdGlvbi1hbnN3ZXJpbmdcIlxuICB9KTtcbiAgY29uc3QgaXNWYWxpZE91dHB1dCA9IHR5cGVvZiByZXMgPT09IFwib2JqZWN0XCIgJiYgISFyZXMgJiYgdHlwZW9mIHJlcy5hbnN3ZXIgPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIHJlcy5lbmQgPT09IFwibnVtYmVyXCIgJiYgdHlwZW9mIHJlcy5zY29yZSA9PT0gXCJudW1iZXJcIiAmJiB0eXBlb2YgcmVzLnN0YXJ0ID09PSBcIm51bWJlclwiO1xuICBpZiAoIWlzVmFsaWRPdXRwdXQpIHtcbiAgICB0aHJvdyBuZXcgSW5mZXJlbmNlT3V0cHV0RXJyb3IoXCJFeHBlY3RlZCB7YW5zd2VyOiBzdHJpbmcsIGVuZDogbnVtYmVyLCBzY29yZTogbnVtYmVyLCBzdGFydDogbnVtYmVyfVwiKTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuLy8gc3JjL3Rhc2tzL25scC9zZW50ZW5jZVNpbWlsYXJpdHkudHNcbmFzeW5jIGZ1bmN0aW9uIHNlbnRlbmNlU2ltaWxhcml0eShhcmdzLCBvcHRpb25zKSB7XG4gIGNvbnN0IGRlZmF1bHRUYXNrID0gYXJncy5tb2RlbCA/IGF3YWl0IGdldERlZmF1bHRUYXNrKGFyZ3MubW9kZWwsIGFyZ3MuYWNjZXNzVG9rZW4sIG9wdGlvbnMpIDogdm9pZCAwO1xuICBjb25zdCByZXMgPSBhd2FpdCByZXF1ZXN0KGFyZ3MsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIHRhc2tIaW50OiBcInNlbnRlbmNlLXNpbWlsYXJpdHlcIixcbiAgICAuLi4oZGVmYXVsdFRhc2sgPT09IFwiZmVhdHVyZS1leHRyYWN0aW9uXCIgJiYge1xuICAgICAgZm9yY2VUYXNrOiBcInNlbnRlbmNlLXNpbWlsYXJpdHlcIlxuICAgIH0pXG4gIH0pO1xuICBjb25zdCBpc1ZhbGlkT3V0cHV0ID0gQXJyYXkuaXNBcnJheShyZXMpICYmIHJlcy5ldmVyeSh4ID0+IHR5cGVvZiB4ID09PSBcIm51bWJlclwiKTtcbiAgaWYgKCFpc1ZhbGlkT3V0cHV0KSB7XG4gICAgdGhyb3cgbmV3IEluZmVyZW5jZU91dHB1dEVycm9yKFwiRXhwZWN0ZWQgbnVtYmVyW11cIik7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cbi8vIHNyYy90YXNrcy9ubHAvc3VtbWFyaXphdGlvbi50c1xuYXN5bmMgZnVuY3Rpb24gc3VtbWFyaXphdGlvbihhcmdzLCBvcHRpb25zKSB7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IHJlcXVlc3QoYXJncywge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgdGFza0hpbnQ6IFwic3VtbWFyaXphdGlvblwiXG4gIH0pO1xuICBjb25zdCBpc1ZhbGlkT3V0cHV0ID0gQXJyYXkuaXNBcnJheShyZXMpICYmIHJlcy5ldmVyeSh4ID0+IHR5cGVvZiB4Py5zdW1tYXJ5X3RleHQgPT09IFwic3RyaW5nXCIpO1xuICBpZiAoIWlzVmFsaWRPdXRwdXQpIHtcbiAgICB0aHJvdyBuZXcgSW5mZXJlbmNlT3V0cHV0RXJyb3IoXCJFeHBlY3RlZCBBcnJheTx7c3VtbWFyeV90ZXh0OiBzdHJpbmd9PlwiKTtcbiAgfVxuICByZXR1cm4gcmVzPy5bMF07XG59XG4vLyBzcmMvdGFza3MvbmxwL3RhYmxlUXVlc3Rpb25BbnN3ZXJpbmcudHNcbmFzeW5jIGZ1bmN0aW9uIHRhYmxlUXVlc3Rpb25BbnN3ZXJpbmcoYXJncywgb3B0aW9ucykge1xuICBjb25zdCByZXMgPSBhd2FpdCByZXF1ZXN0KGFyZ3MsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIHRhc2tIaW50OiBcInRhYmxlLXF1ZXN0aW9uLWFuc3dlcmluZ1wiXG4gIH0pO1xuICBjb25zdCBpc1ZhbGlkT3V0cHV0ID0gdHlwZW9mIHJlcz8uYWdncmVnYXRvciA9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgcmVzLmFuc3dlciA9PT0gXCJzdHJpbmdcIiAmJiBBcnJheS5pc0FycmF5KHJlcy5jZWxscykgJiYgcmVzLmNlbGxzLmV2ZXJ5KHggPT4gdHlwZW9mIHggPT09IFwic3RyaW5nXCIpICYmIEFycmF5LmlzQXJyYXkocmVzLmNvb3JkaW5hdGVzKSAmJiByZXMuY29vcmRpbmF0ZXMuZXZlcnkoY29vcmQgPT4gQXJyYXkuaXNBcnJheShjb29yZCkgJiYgY29vcmQuZXZlcnkoeCA9PiB0eXBlb2YgeCA9PT0gXCJudW1iZXJcIikpO1xuICBpZiAoIWlzVmFsaWRPdXRwdXQpIHtcbiAgICB0aHJvdyBuZXcgSW5mZXJlbmNlT3V0cHV0RXJyb3IoXCJFeHBlY3RlZCB7YWdncmVnYXRvcjogc3RyaW5nLCBhbnN3ZXI6IHN0cmluZywgY2VsbHM6IHN0cmluZ1tdLCBjb29yZGluYXRlczogbnVtYmVyW11bXX1cIik7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cbi8vIHNyYy90YXNrcy9ubHAvdGV4dENsYXNzaWZpY2F0aW9uLnRzXG5hc3luYyBmdW5jdGlvbiB0ZXh0Q2xhc3NpZmljYXRpb24oYXJncywgb3B0aW9ucykge1xuICBjb25zdCByZXMgPSAoYXdhaXQgcmVxdWVzdChhcmdzLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICB0YXNrSGludDogXCJ0ZXh0LWNsYXNzaWZpY2F0aW9uXCJcbiAgfSkpPy5bMF07XG4gIGNvbnN0IGlzVmFsaWRPdXRwdXQgPSBBcnJheS5pc0FycmF5KHJlcykgJiYgcmVzLmV2ZXJ5KHggPT4gdHlwZW9mIHg/LmxhYmVsID09PSBcInN0cmluZ1wiICYmIHR5cGVvZiB4LnNjb3JlID09PSBcIm51bWJlclwiKTtcbiAgaWYgKCFpc1ZhbGlkT3V0cHV0KSB7XG4gICAgdGhyb3cgbmV3IEluZmVyZW5jZU91dHB1dEVycm9yKFwiRXhwZWN0ZWQgQXJyYXk8e2xhYmVsOiBzdHJpbmcsIHNjb3JlOiBudW1iZXJ9PlwiKTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuLy8gc3JjL3V0aWxzL3RvQXJyYXkudHNcbmZ1bmN0aW9uIHRvQXJyYXkob2JqKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICByZXR1cm4gb2JqO1xuICB9XG4gIHJldHVybiBbb2JqXTtcbn1cbi8vIHNyYy90YXNrcy9ubHAvdGV4dEdlbmVyYXRpb24udHNcbmFzeW5jIGZ1bmN0aW9uIHRleHRHZW5lcmF0aW9uKGFyZ3MsIG9wdGlvbnMpIHtcbiAgY29uc3QgcmVzID0gdG9BcnJheShhd2FpdCByZXF1ZXN0KGFyZ3MsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIHRhc2tIaW50OiBcInRleHQtZ2VuZXJhdGlvblwiXG4gIH0pKTtcbiAgY29uc3QgaXNWYWxpZE91dHB1dCA9IEFycmF5LmlzQXJyYXkocmVzKSAmJiByZXMuZXZlcnkoeCA9PiB0eXBlb2YgeD8uZ2VuZXJhdGVkX3RleHQgPT09IFwic3RyaW5nXCIpO1xuICBpZiAoIWlzVmFsaWRPdXRwdXQpIHtcbiAgICB0aHJvdyBuZXcgSW5mZXJlbmNlT3V0cHV0RXJyb3IoXCJFeHBlY3RlZCBBcnJheTx7Z2VuZXJhdGVkX3RleHQ6IHN0cmluZ30+XCIpO1xuICB9XG4gIHJldHVybiByZXM/LlswXTtcbn1cbi8vIHNyYy90YXNrcy9ubHAvdGV4dEdlbmVyYXRpb25TdHJlYW0udHNcbmFzeW5jIGZ1bmN0aW9uKiB0ZXh0R2VuZXJhdGlvblN0cmVhbShhcmdzLCBvcHRpb25zKSB7XG4gIHlpZWxkKiBzdHJlYW1pbmdSZXF1ZXN0KGFyZ3MsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIHRhc2tIaW50OiBcInRleHQtZ2VuZXJhdGlvblwiXG4gIH0pO1xufVxuLy8gc3JjL3Rhc2tzL25scC90b2tlbkNsYXNzaWZpY2F0aW9uLnRzXG5hc3luYyBmdW5jdGlvbiB0b2tlbkNsYXNzaWZpY2F0aW9uKGFyZ3MsIG9wdGlvbnMpIHtcbiAgY29uc3QgcmVzID0gdG9BcnJheShhd2FpdCByZXF1ZXN0KGFyZ3MsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIHRhc2tIaW50OiBcInRva2VuLWNsYXNzaWZpY2F0aW9uXCJcbiAgfSkpO1xuICBjb25zdCBpc1ZhbGlkT3V0cHV0ID0gQXJyYXkuaXNBcnJheShyZXMpICYmIHJlcy5ldmVyeSh4ID0+IHR5cGVvZiB4LmVuZCA9PT0gXCJudW1iZXJcIiAmJiB0eXBlb2YgeC5lbnRpdHlfZ3JvdXAgPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIHguc2NvcmUgPT09IFwibnVtYmVyXCIgJiYgdHlwZW9mIHguc3RhcnQgPT09IFwibnVtYmVyXCIgJiYgdHlwZW9mIHgud29yZCA9PT0gXCJzdHJpbmdcIik7XG4gIGlmICghaXNWYWxpZE91dHB1dCkge1xuICAgIHRocm93IG5ldyBJbmZlcmVuY2VPdXRwdXRFcnJvcihcIkV4cGVjdGVkIEFycmF5PHtlbmQ6IG51bWJlciwgZW50aXR5X2dyb3VwOiBzdHJpbmcsIHNjb3JlOiBudW1iZXIsIHN0YXJ0OiBudW1iZXIsIHdvcmQ6IHN0cmluZ30+XCIpO1xuICB9XG4gIHJldHVybiByZXM7XG59XG4vLyBzcmMvdGFza3MvbmxwL3RyYW5zbGF0aW9uLnRzXG5hc3luYyBmdW5jdGlvbiB0cmFuc2xhdGlvbihhcmdzLCBvcHRpb25zKSB7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IHJlcXVlc3QoYXJncywge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgdGFza0hpbnQ6IFwidHJhbnNsYXRpb25cIlxuICB9KTtcbiAgY29uc3QgaXNWYWxpZE91dHB1dCA9IEFycmF5LmlzQXJyYXkocmVzKSAmJiByZXMuZXZlcnkoeCA9PiB0eXBlb2YgeD8udHJhbnNsYXRpb25fdGV4dCA9PT0gXCJzdHJpbmdcIik7XG4gIGlmICghaXNWYWxpZE91dHB1dCkge1xuICAgIHRocm93IG5ldyBJbmZlcmVuY2VPdXRwdXRFcnJvcihcIkV4cGVjdGVkIHR5cGUgQXJyYXk8e3RyYW5zbGF0aW9uX3RleHQ6IHN0cmluZ30+XCIpO1xuICB9XG4gIHJldHVybiByZXM/Lmxlbmd0aCA9PT0gMSA/IHJlcz8uWzBdIDogcmVzO1xufVxuLy8gc3JjL3Rhc2tzL25scC96ZXJvU2hvdENsYXNzaWZpY2F0aW9uLnRzXG5hc3luYyBmdW5jdGlvbiB6ZXJvU2hvdENsYXNzaWZpY2F0aW9uKGFyZ3MsIG9wdGlvbnMpIHtcbiAgY29uc3QgcmVzID0gdG9BcnJheShhd2FpdCByZXF1ZXN0KGFyZ3MsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIHRhc2tIaW50OiBcInplcm8tc2hvdC1jbGFzc2lmaWNhdGlvblwiXG4gIH0pKTtcbiAgY29uc3QgaXNWYWxpZE91dHB1dCA9IEFycmF5LmlzQXJyYXkocmVzKSAmJiByZXMuZXZlcnkoeCA9PiBBcnJheS5pc0FycmF5KHgubGFiZWxzKSAmJiB4LmxhYmVscy5ldmVyeShfbGFiZWwgPT4gdHlwZW9mIF9sYWJlbCA9PT0gXCJzdHJpbmdcIikgJiYgQXJyYXkuaXNBcnJheSh4LnNjb3JlcykgJiYgeC5zY29yZXMuZXZlcnkoX3Njb3JlID0+IHR5cGVvZiBfc2NvcmUgPT09IFwibnVtYmVyXCIpICYmIHR5cGVvZiB4LnNlcXVlbmNlID09PSBcInN0cmluZ1wiKTtcbiAgaWYgKCFpc1ZhbGlkT3V0cHV0KSB7XG4gICAgdGhyb3cgbmV3IEluZmVyZW5jZU91dHB1dEVycm9yKFwiRXhwZWN0ZWQgQXJyYXk8e2xhYmVsczogc3RyaW5nW10sIHNjb3JlczogbnVtYmVyW10sIHNlcXVlbmNlOiBzdHJpbmd9PlwiKTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuLy8gc3JjL3Rhc2tzL25scC9jaGF0Q29tcGxldGlvbi50c1xuYXN5bmMgZnVuY3Rpb24gY2hhdENvbXBsZXRpb24oYXJncywgb3B0aW9ucykge1xuICBjb25zdCByZXMgPSBhd2FpdCByZXF1ZXN0KGFyZ3MsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIHRhc2tIaW50OiBcInRleHQtZ2VuZXJhdGlvblwiLFxuICAgIGNoYXRDb21wbGV0aW9uOiB0cnVlXG4gIH0pO1xuICBjb25zdCBpc1ZhbGlkT3V0cHV0ID0gdHlwZW9mIHJlcyA9PT0gXCJvYmplY3RcIiAmJiBBcnJheS5pc0FycmF5KHJlcz8uY2hvaWNlcykgJiYgdHlwZW9mIHJlcz8uY3JlYXRlZCA9PT0gXCJudW1iZXJcIiAmJiB0eXBlb2YgcmVzPy5pZCA9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgcmVzPy5tb2RlbCA9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgcmVzPy5zeXN0ZW1fZmluZ2VycHJpbnQgPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIHJlcz8udXNhZ2UgPT09IFwib2JqZWN0XCI7XG4gIGlmICghaXNWYWxpZE91dHB1dCkge1xuICAgIHRocm93IG5ldyBJbmZlcmVuY2VPdXRwdXRFcnJvcihcIkV4cGVjdGVkIENoYXRDb21wbGV0aW9uT3V0cHV0XCIpO1xuICB9XG4gIHJldHVybiByZXM7XG59XG4vLyBzcmMvdGFza3MvbmxwL2NoYXRDb21wbGV0aW9uU3RyZWFtLnRzXG5hc3luYyBmdW5jdGlvbiogY2hhdENvbXBsZXRpb25TdHJlYW0oYXJncywgb3B0aW9ucykge1xuICB5aWVsZCogc3RyZWFtaW5nUmVxdWVzdChhcmdzLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICB0YXNrSGludDogXCJ0ZXh0LWdlbmVyYXRpb25cIixcbiAgICBjaGF0Q29tcGxldGlvbjogdHJ1ZVxuICB9KTtcbn1cbi8vIHNyYy90YXNrcy9tdWx0aW1vZGFsL2RvY3VtZW50UXVlc3Rpb25BbnN3ZXJpbmcudHNcbmFzeW5jIGZ1bmN0aW9uIGRvY3VtZW50UXVlc3Rpb25BbnN3ZXJpbmcoYXJncywgb3B0aW9ucykge1xuICBjb25zdCByZXFBcmdzID0ge1xuICAgIC4uLmFyZ3MsXG4gICAgaW5wdXRzOiB7XG4gICAgICBxdWVzdGlvbjogYXJncy5pbnB1dHMucXVlc3Rpb24sXG4gICAgICAvLyBjb252ZXJ0IEJsb2Igb3IgQXJyYXlCdWZmZXIgdG8gYmFzZTY0XG4gICAgICBpbWFnZTogYmFzZTY0RnJvbUJ5dGVzKG5ldyBVaW50OEFycmF5KGFyZ3MuaW5wdXRzLmltYWdlIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIgPyBhcmdzLmlucHV0cy5pbWFnZSA6IGF3YWl0IGFyZ3MuaW5wdXRzLmltYWdlLmFycmF5QnVmZmVyKCkpKVxuICAgIH1cbiAgfTtcbiAgY29uc3QgcmVzID0gdG9BcnJheShhd2FpdCByZXF1ZXN0KHJlcUFyZ3MsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIHRhc2tIaW50OiBcImRvY3VtZW50LXF1ZXN0aW9uLWFuc3dlcmluZ1wiXG4gIH0pKT8uWzBdO1xuICBjb25zdCBpc1ZhbGlkT3V0cHV0ID0gdHlwZW9mIHJlcz8uYW5zd2VyID09PSBcInN0cmluZ1wiICYmICh0eXBlb2YgcmVzLmVuZCA9PT0gXCJudW1iZXJcIiB8fCB0eXBlb2YgcmVzLmVuZCA9PT0gXCJ1bmRlZmluZWRcIikgJiYgKHR5cGVvZiByZXMuc2NvcmUgPT09IFwibnVtYmVyXCIgfHwgdHlwZW9mIHJlcy5zY29yZSA9PT0gXCJ1bmRlZmluZWRcIikgJiYgKHR5cGVvZiByZXMuc3RhcnQgPT09IFwibnVtYmVyXCIgfHwgdHlwZW9mIHJlcy5zdGFydCA9PT0gXCJ1bmRlZmluZWRcIik7XG4gIGlmICghaXNWYWxpZE91dHB1dCkge1xuICAgIHRocm93IG5ldyBJbmZlcmVuY2VPdXRwdXRFcnJvcihcIkV4cGVjdGVkIEFycmF5PHthbnN3ZXI6IHN0cmluZywgZW5kPzogbnVtYmVyLCBzY29yZT86IG51bWJlciwgc3RhcnQ/OiBudW1iZXJ9PlwiKTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuLy8gc3JjL3Rhc2tzL211bHRpbW9kYWwvdmlzdWFsUXVlc3Rpb25BbnN3ZXJpbmcudHNcbmFzeW5jIGZ1bmN0aW9uIHZpc3VhbFF1ZXN0aW9uQW5zd2VyaW5nKGFyZ3MsIG9wdGlvbnMpIHtcbiAgY29uc3QgcmVxQXJncyA9IHtcbiAgICAuLi5hcmdzLFxuICAgIGlucHV0czoge1xuICAgICAgcXVlc3Rpb246IGFyZ3MuaW5wdXRzLnF1ZXN0aW9uLFxuICAgICAgLy8gY29udmVydCBCbG9iIG9yIEFycmF5QnVmZmVyIHRvIGJhc2U2NFxuICAgICAgaW1hZ2U6IGJhc2U2NEZyb21CeXRlcyhuZXcgVWludDhBcnJheShhcmdzLmlucHV0cy5pbWFnZSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyID8gYXJncy5pbnB1dHMuaW1hZ2UgOiBhd2FpdCBhcmdzLmlucHV0cy5pbWFnZS5hcnJheUJ1ZmZlcigpKSlcbiAgICB9XG4gIH07XG4gIGNvbnN0IHJlcyA9IChhd2FpdCByZXF1ZXN0KHJlcUFyZ3MsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIHRhc2tIaW50OiBcInZpc3VhbC1xdWVzdGlvbi1hbnN3ZXJpbmdcIlxuICB9KSk/LlswXTtcbiAgY29uc3QgaXNWYWxpZE91dHB1dCA9IHR5cGVvZiByZXM/LmFuc3dlciA9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgcmVzLnNjb3JlID09PSBcIm51bWJlclwiO1xuICBpZiAoIWlzVmFsaWRPdXRwdXQpIHtcbiAgICB0aHJvdyBuZXcgSW5mZXJlbmNlT3V0cHV0RXJyb3IoXCJFeHBlY3RlZCBBcnJheTx7YW5zd2VyOiBzdHJpbmcsIHNjb3JlOiBudW1iZXJ9PlwiKTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuLy8gc3JjL3Rhc2tzL3RhYnVsYXIvdGFidWxhclJlZ3Jlc3Npb24udHNcbmFzeW5jIGZ1bmN0aW9uIHRhYnVsYXJSZWdyZXNzaW9uKGFyZ3MsIG9wdGlvbnMpIHtcbiAgY29uc3QgcmVzID0gYXdhaXQgcmVxdWVzdChhcmdzLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICB0YXNrSGludDogXCJ0YWJ1bGFyLXJlZ3Jlc3Npb25cIlxuICB9KTtcbiAgY29uc3QgaXNWYWxpZE91dHB1dCA9IEFycmF5LmlzQXJyYXkocmVzKSAmJiByZXMuZXZlcnkoeCA9PiB0eXBlb2YgeCA9PT0gXCJudW1iZXJcIik7XG4gIGlmICghaXNWYWxpZE91dHB1dCkge1xuICAgIHRocm93IG5ldyBJbmZlcmVuY2VPdXRwdXRFcnJvcihcIkV4cGVjdGVkIG51bWJlcltdXCIpO1xuICB9XG4gIHJldHVybiByZXM7XG59XG4vLyBzcmMvdGFza3MvdGFidWxhci90YWJ1bGFyQ2xhc3NpZmljYXRpb24udHNcbmFzeW5jIGZ1bmN0aW9uIHRhYnVsYXJDbGFzc2lmaWNhdGlvbihhcmdzLCBvcHRpb25zKSB7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IHJlcXVlc3QoYXJncywge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgdGFza0hpbnQ6IFwidGFidWxhci1jbGFzc2lmaWNhdGlvblwiXG4gIH0pO1xuICBjb25zdCBpc1ZhbGlkT3V0cHV0ID0gQXJyYXkuaXNBcnJheShyZXMpICYmIHJlcy5ldmVyeSh4ID0+IHR5cGVvZiB4ID09PSBcIm51bWJlclwiKTtcbiAgaWYgKCFpc1ZhbGlkT3V0cHV0KSB7XG4gICAgdGhyb3cgbmV3IEluZmVyZW5jZU91dHB1dEVycm9yKFwiRXhwZWN0ZWQgbnVtYmVyW11cIik7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cbi8vIHNyYy9IZkluZmVyZW5jZS50c1xudmFyIEhmSW5mZXJlbmNlID0gY2xhc3Mge1xuICBhY2Nlc3NUb2tlbjtcbiAgZGVmYXVsdE9wdGlvbnM7XG4gIGNvbnN0cnVjdG9yKGFjY2Vzc1Rva2VuID0gXCJcIiwgZGVmYXVsdE9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMuYWNjZXNzVG9rZW4gPSBhY2Nlc3NUb2tlbjtcbiAgICB0aGlzLmRlZmF1bHRPcHRpb25zID0gZGVmYXVsdE9wdGlvbnM7XG4gICAgZm9yIChjb25zdCBbbmFtZSwgZm5dIG9mIE9iamVjdC5lbnRyaWVzKHRhc2tzX2V4cG9ydHMpKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgbmFtZSwge1xuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgdmFsdWU6IChwYXJhbXMsIG9wdGlvbnMpID0+XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgIGZuKHtcbiAgICAgICAgICAuLi5wYXJhbXMsXG4gICAgICAgICAgYWNjZXNzVG9rZW5cbiAgICAgICAgfSwge1xuICAgICAgICAgIC4uLmRlZmF1bHRPcHRpb25zLFxuICAgICAgICAgIC4uLm9wdGlvbnNcbiAgICAgICAgfSlcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogUmV0dXJucyBjb3B5IG9mIEhmSW5mZXJlbmNlIHRpZWQgdG8gYSBzcGVjaWZpZWQgZW5kcG9pbnQuXG4gICAqL1xuICBlbmRwb2ludChlbmRwb2ludFVybCkge1xuICAgIHJldHVybiBuZXcgSGZJbmZlcmVuY2VFbmRwb2ludChlbmRwb2ludFVybCwgdGhpcy5hY2Nlc3NUb2tlbiwgdGhpcy5kZWZhdWx0T3B0aW9ucyk7XG4gIH1cbn07XG52YXIgSGZJbmZlcmVuY2VFbmRwb2ludCA9IGNsYXNzIHtcbiAgY29uc3RydWN0b3IoZW5kcG9pbnRVcmwsIGFjY2Vzc1Rva2VuID0gXCJcIiwgZGVmYXVsdE9wdGlvbnMgPSB7fSkge1xuICAgIGFjY2Vzc1Rva2VuO1xuICAgIGRlZmF1bHRPcHRpb25zO1xuICAgIGZvciAoY29uc3QgW25hbWUsIGZuXSBvZiBPYmplY3QuZW50cmllcyh0YXNrc19leHBvcnRzKSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIG5hbWUsIHtcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHZhbHVlOiAocGFyYW1zLCBvcHRpb25zKSA9PlxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICBmbih7XG4gICAgICAgICAgLi4ucGFyYW1zLFxuICAgICAgICAgIGFjY2Vzc1Rva2VuLFxuICAgICAgICAgIGVuZHBvaW50VXJsXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAuLi5kZWZhdWx0T3B0aW9ucyxcbiAgICAgICAgICAuLi5vcHRpb25zXG4gICAgICAgIH0pXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn07XG5leHBvcnQgeyBIZkluZmVyZW5jZSwgSGZJbmZlcmVuY2VFbmRwb2ludCwgSW5mZXJlbmNlT3V0cHV0RXJyb3IsIGF1ZGlvQ2xhc3NpZmljYXRpb24sIGF1ZGlvVG9BdWRpbywgYXV0b21hdGljU3BlZWNoUmVjb2duaXRpb24sIGNoYXRDb21wbGV0aW9uLCBjaGF0Q29tcGxldGlvblN0cmVhbSwgZG9jdW1lbnRRdWVzdGlvbkFuc3dlcmluZywgZmVhdHVyZUV4dHJhY3Rpb24sIGZpbGxNYXNrLCBpbWFnZUNsYXNzaWZpY2F0aW9uLCBpbWFnZVNlZ21lbnRhdGlvbiwgaW1hZ2VUb0ltYWdlLCBpbWFnZVRvVGV4dCwgb2JqZWN0RGV0ZWN0aW9uLCBxdWVzdGlvbkFuc3dlcmluZywgcmVxdWVzdCwgc2VudGVuY2VTaW1pbGFyaXR5LCBzdHJlYW1pbmdSZXF1ZXN0LCBzdW1tYXJpemF0aW9uLCB0YWJsZVF1ZXN0aW9uQW5zd2VyaW5nLCB0YWJ1bGFyQ2xhc3NpZmljYXRpb24sIHRhYnVsYXJSZWdyZXNzaW9uLCB0ZXh0Q2xhc3NpZmljYXRpb24sIHRleHRHZW5lcmF0aW9uLCB0ZXh0R2VuZXJhdGlvblN0cmVhbSwgdGV4dFRvSW1hZ2UsIHRleHRUb1NwZWVjaCwgdG9rZW5DbGFzc2lmaWNhdGlvbiwgdHJhbnNsYXRpb24sIHZpc3VhbFF1ZXN0aW9uQW5zd2VyaW5nLCB6ZXJvU2hvdENsYXNzaWZpY2F0aW9uLCB6ZXJvU2hvdEltYWdlQ2xhc3NpZmljYXRpb24gfTsiLCJpbXBvcnQgJy4vY29tbW9uJztcbmltcG9ydCAnLi4vbW9kdWxlcy9vdmVybGF5L2JhY2tncm91bmQnO1xuaW1wb3J0ICcuLi9tb2R1bGVzL2h1Z2dpbmdmYWNlL2JhY2tncm91bmQnO1xuLy8gaW1wb3J0ICcuLi9tb2R1bGVzL25ldHdvcmsvYmFja2dyb3VuZCc7IiwiaW1wb3J0IHsgb25SdW50aW1lTWVzc2FnZSB9IGZyb20gJy4uL3V0aWxzJztcbi8vIGNocm9tZS50YWJzLm9uVXBkYXRlZC5hZGRMaXN0ZW5lcigodGFiKSA9PiB7XG4vLyAgICAgY29uc29sZS5sb2coJ2NyZWF0ZSB0YWInLCB0YWIuaWQpXG4vLyAgICAgc2VuZFRhYk1lc3NhZ2UodGFiLmlkISwgW3RhYi5pZCFdKTtcbi8vIH0pO1xub25SdW50aW1lTWVzc2FnZSgndGFiSW5mbycsIChkYXRhLCBzZW5kZXIsIHJlc3BvbnNlKSA9PiB7XG4gIHJlc3BvbnNlKHNlbmRlci50YWI/LmlkKTtcbn0pO1xuLy8gb25SdW50aW1lTWVzc2FnZSgnZXhlY1NjcmlwdCcsIChbc2NyaXB0LCBWT10sIHNlbmRlciwgcmVzcG9uc2UpID0+IHtcbi8vICAgICBldmFsU2NyaXB0SW5UYWIoc2VuZGVyLnRhYj8uaWQhLCBzY3JpcHQsIFZPKTtcbi8vIH0pOyIsImltcG9ydCB7IG9uUnVudGltZU1lc3NhZ2UgfSBmcm9tICcuLi8uLi91dGlscyc7XG5pbXBvcnQgeyBIZkluZmVyZW5jZSB9IGZyb20gJ0BodWdnaW5nZmFjZS9pbmZlcmVuY2UnO1xuLy8gaHR0cHM6Ly9odWdnaW5nZmFjZS5jby9zZXR0aW5ncy90b2tlbnNcbmNvbnN0IEhGX1RPS0VOID0gJyc7XG5jb25zdCBpbmZlcmVuY2UgPSBuZXcgSGZJbmZlcmVuY2UoSEZfVE9LRU4pO1xubGV0IGxhc3RSZXN1bHQgPSB1bmRlZmluZWQ7XG5vblJ1bnRpbWVNZXNzYWdlKCdxdWVyeUh1Z2dpbmdGYWNlJywgYXN5bmMgKGRhdGEsIHNlbmRlciwgcmVzcG9uc2UpID0+IHtcbiAgY29uc3QgW2FwaSwgcGFyYW1zXSA9IGRhdGE7XG4gIGNvbnNvbGUubG9nKGBzZW5kIEh1Z2dpbmdGYWNlOiAke2FwaX1gKTtcbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgaW5mZXJlbmNlW2FwaV0ocGFyYW1zKTtcbiAgbGFzdFJlc3VsdCA9IHtcbiAgICBhcGksXG4gICAgcGFyYW1zLFxuICAgIHJlc3VsdFxuICB9O1xuICByZXNwb25zZShsYXN0UmVzdWx0KTtcbn0pO1xub25SdW50aW1lTWVzc2FnZSgnZ2V0TGFzdEh1Z2dpbmdGYWNlRGF0YScsIGFzeW5jIChkYXRhLCBzZW5kZXIsIHJlc3BvbnNlKSA9PiB7XG4gIHJlc3BvbnNlKGxhc3RSZXN1bHQpO1xufSk7XG5jb25zb2xlLmxvZygnSHVnZ2luZ0ZhY2UgbW9kdWxlIGxvYWRlZCcpOyIsImltcG9ydCB7IG9uUnVudGltZU1lc3NhZ2UsIHNlbmRUYWJNZXNzYWdlIH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xuLy8g5a2Y5YaF5a2Y44CC5YWz5rWP6KeI5Zmo5LiiXG5jb25zdCBvdmVybGF5TWFwID0gbmV3IE1hcCgpO1xuY29uc29sZS5sb2coJ2NhcHR1cmUgYmFja2dyb3VuZCByZWFkeScsIG92ZXJsYXlNYXApO1xub25SdW50aW1lTWVzc2FnZSgnc2V0T3ZlcmxheUNhcHR1cmUnLCAoZGF0YSwgc2VuZGVyLCByZXNwb25zZSkgPT4ge1xuICBsZXQgW2N1cnJlbnRUYWJJZCwgY2FwdHVyZURhdGFdID0gZGF0YTtcbiAgLy8gY29uc29sZS5sb2coJ3NldE92ZXJsYXlDYXB0dXJlJywgY3VycmVudFRhYklkKTtcbiAgLy8g56m655qEYmFzZTY05pivIGRhdGE6LFxuICBpZiAoIWNhcHR1cmVEYXRhPy5iYXNlNjQgfHwgY2FwdHVyZURhdGEuYmFzZTY0Lmxlbmd0aCA8IDEwKSB7XG4gICAgb3ZlcmxheU1hcC5kZWxldGUoY3VycmVudFRhYklkKTtcbiAgfSBlbHNlIHtcbiAgICBvdmVybGF5TWFwLnNldChjdXJyZW50VGFiSWQsIGNhcHR1cmVEYXRhKTtcbiAgICByZXNwb25zZSgpO1xuICB9XG4gIC8vIGNvbnNvbGUubG9nKCdzZW5kVGFiTWVzc2FnZSB1cGRhdGVPdmVybGF5Q2FwdHVyZScsIGN1cnJlbnRUYWJJZCwgb3ZlcmxheU1hcC5nZXQoY3VycmVudFRhYklkKSk7XG4gIGlmIChuZXcgVVJMKHNlbmRlci5vcmlnaW4gPz8gJycpLnByb3RvY29sID09PSAnY2hyb21lLWV4dGVuc2lvbjonKSB7XG4gICAgc2VuZFRhYk1lc3NhZ2UoJ3VwZGF0ZU92ZXJsYXlDYXB0dXJlJywgY3VycmVudFRhYklkLCBbb3ZlcmxheU1hcC5nZXQoY3VycmVudFRhYklkKV0pO1xuICB9XG59KTtcbm9uUnVudGltZU1lc3NhZ2UoJ2dldE92ZXJsYXlDYXB0dXJlJywgKGRhdGEsIHNlbmRlciwgcmVzcG9uc2UpID0+IHtcbiAgbGV0IFtjdXJyZW50VGFiSWRdID0gZGF0YTtcbiAgY29uc3QgY2FwdHVyZURhdGEgPSBvdmVybGF5TWFwLmdldChjdXJyZW50VGFiSWQpO1xuICByZXNwb25zZShjYXB0dXJlRGF0YSk7XG59KTsiLCJpbXBvcnQgeyAkIH0gZnJvbSAnLi90b29scyc7XG4vLyB0YWJzID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U2VsZWN0ZWQoKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShyZXMgPT4ge1xuICAgIC8vIGNocm9tZS50YWJzLmdldFNlbGVjdGVkKGZ1bmN0aW9uICh0YWIpIHtcbiAgICAvLyAgICAgcmVzKHRhYik7XG4gICAgLy8gfSk7XG4gICAgY2hyb21lLnRhYnMucXVlcnkoe1xuICAgICAgY3VycmVudFdpbmRvdzogdHJ1ZSxcbiAgICAgIGFjdGl2ZTogdHJ1ZVxuICAgIH0sIGZ1bmN0aW9uICh0YWJzKSB7XG4gICAgICByZXModGFic1swXSk7XG4gICAgfSk7XG4gIH0pO1xufVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEN1cnJlbnRUYWIoKSB7XG4gIC8vIHJldHVybiBjaHJvbWUudGFicy5nZXRDdXJyZW50KCk7XG4gIHJldHVybiBuZXcgUHJvbWlzZShyZXMgPT4ge1xuICAgIC8vIGNocm9tZS50YWJzLmdldFNlbGVjdGVkKGZ1bmN0aW9uICh0YWIpIHtcbiAgICAvLyAgICAgcmVzKHRhYik7XG4gICAgLy8gfSk7XG4gICAgY2hyb21lLnRhYnMucXVlcnkoe1xuICAgICAgY3VycmVudFdpbmRvdzogdHJ1ZSxcbiAgICAgIGFjdGl2ZTogdHJ1ZVxuICAgIH0sIGZ1bmN0aW9uICh0YWJzKSB7XG4gICAgICByZXModGFic1swXSk7XG4gICAgfSk7XG4gIH0pO1xufVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFRhYih0YWJJZCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG4gICAgY2hyb21lLnRhYnMuZ2V0KHRhYklkLCB0YWIgPT4ge1xuICAgICAgcmVzKHRhYik7XG4gICAgfSk7XG4gIH0pO1xufVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEFsbFRhYnMoKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShyZXMgPT4ge1xuICAgIGNocm9tZS50YWJzLnF1ZXJ5KHt9LCB0YWJzID0+IHtcbiAgICAgIHJlcyh0YWJzKTtcbiAgICB9KTtcbiAgfSk7XG59XG4vLyBtZXNzYWdlID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBleHBvcnQgZnVuY3Rpb24gc2VuZFRvQ29udGVudChtZXNzYWdlOiBzdHJpbmcsIGNhbGxiYWNrOiBDb21tb25DYWxsYmFjaykge1xuLy8gICAgIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sIGZ1bmN0aW9uICh0YWJzKSB7XG4vLyAgICAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKHRhYnNbMF0hLmlkISwgbWVzc2FnZSwgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4vLyAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKHJlc3BvbnNlKTtcbi8vICAgICAgICAgfSk7XG4vLyAgICAgfSk7XG4vLyB9XG4vLyBleHBvcnQgZnVuY3Rpb24gY29udGVudE9uTWVzc2FnZShjYWxsYmFjazogQ29tbW9uQ2FsbGJhY2spIHtcbi8vICAgICBjaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKHJlcXVlc3QsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSB7XG4vLyAgICAgICAgIGlmIChzZW5kZXIudGFiKSB7XG4vLyAgICAgICAgICAgICByZXR1cm47XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2socmVxdWVzdCk7XG4vLyAgICAgfSk7XG4vLyB9XG4vLyBwb3B1cCA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuZXhwb3J0IGNvbnN0IHBvcHVwTWF4V2lkdGggPSA1MDA7XG5leHBvcnQgY29uc3QgcG9wdXBNYXhIZWlnaHQgPSA2MDA7XG5leHBvcnQgY29uc3QgcG9wdXBNaW5XaWR0aCA9IDIwMDtcbmV4cG9ydCBmdW5jdGlvbiBzZXRCb2R5U2l6ZShtYXhXaWR0aCwgbWF4SGVpZ2h0KSB7XG4gICQoJyNtYWluJykuc3R5bGUud2lkdGggPSBgJHttYXhXaWR0aCA/IHBvcHVwTWF4V2lkdGggOiBwb3B1cE1pbldpZHRofXB4YDtcbiAgaWYgKHR5cGVvZiBtYXhIZWlnaHQgPT09ICdib29sZWFuJykge1xuICAgICQoJyNtYWluJykuc3R5bGUuaGVpZ2h0ID0gbWF4SGVpZ2h0ID8gYCR7cG9wdXBNYXhIZWlnaHR9cHhgIDogJyc7XG4gIH1cbn1cbi8vIGVudiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuZXhwb3J0IHZhciBFeGVjRW52O1xuKGZ1bmN0aW9uIChFeGVjRW52KSB7XG4gIEV4ZWNFbnZbRXhlY0VudltcIkJhY2tncm91bmRcIl0gPSAwXSA9IFwiQmFja2dyb3VuZFwiO1xuICBFeGVjRW52W0V4ZWNFbnZbXCJQb3B1cFwiXSA9IDFdID0gXCJQb3B1cFwiO1xuICBFeGVjRW52W0V4ZWNFbnZbXCJDb250ZW50XCJdID0gMl0gPSBcIkNvbnRlbnRcIjtcbn0pKEV4ZWNFbnYgfHwgKEV4ZWNFbnYgPSB7fSkpO1xuZnVuY3Rpb24gZ2V0Q3VycmVudEVudigpIHtcbiAgaWYgKCFjaHJvbWUuZXh0ZW5zaW9uLmdldEJhY2tncm91bmRQYWdlKSB7XG4gICAgcmV0dXJuIEV4ZWNFbnYuQ29udGVudDtcbiAgfVxuICBpZiAoY2hyb21lLmV4dGVuc2lvbi5nZXRCYWNrZ3JvdW5kUGFnZSgpID09PSB3aW5kb3cpIHtcbiAgICByZXR1cm4gRXhlY0Vudi5CYWNrZ3JvdW5kO1xuICB9XG4gIHJldHVybiBFeGVjRW52LlBvcHVwO1xufVxuZXhwb3J0IGNvbnN0IGN1cnJlbnRFbnYgPSBnZXRDdXJyZW50RW52KCk7XG5leHBvcnQgZnVuY3Rpb24gZXZhbFNjcmlwdEluVGFiKHRhYklkLCBzY3JpcHQsIHZhck9iaiA9IHt9KSB7XG4gIGNvbnN0IHZhck5hbWVzID0gW107XG4gIGNvbnN0IHZhckRhdGEgPSBbXTtcbiAgT2JqZWN0LmVudHJpZXModmFyT2JqKS5mb3JFYWNoKChbbmFtZSwgZGF0YV0pID0+IHtcbiAgICB2YXJOYW1lcy5wdXNoKG5hbWUpO1xuICAgIHZhckRhdGEucHVzaChkYXRhKTtcbiAgfSk7XG4gIGNocm9tZS5zY3JpcHRpbmcuZXhlY3V0ZVNjcmlwdCh7XG4gICAgdGFyZ2V0OiB7XG4gICAgICB0YWJJZFxuICAgIH0sXG4gICAgYXJnczogW3NjcmlwdCwgdmFyTmFtZXMsIHZhckRhdGFdLFxuICAgIGZ1bmM6IChzY3JpcHQsIHZhck5hbWVzID0gW10sIHZhckRhdGEgPSBbXSkgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ2VlZWU9PT09PScsIHNjcmlwdCwgdmFyTmFtZXMsIHZhckRhdGEpO1xuICAgICAgcmV0dXJuIEZ1bmN0aW9uKC4uLnZhck5hbWVzLCBgXCJ1c2Ugc3RyaWN0XCI7JHtzY3JpcHR9YCkoLi4udmFyRGF0YSk7XG4gICAgfVxuICB9KTtcbn0iLCJleHBvcnQgZnVuY3Rpb24gYmluZERyYWdnZXIobm9kZSwgc3RhcnRYR2V0dGVyLCBzdGFydFlHZXR0ZXIsIG9uVXBkYXRlKSB7XG4gIGxldCBkcmFnZ2luZyA9IGZhbHNlO1xuICBsZXQgc3RhcnRYID0gMDtcbiAgbGV0IHN0YXJ0WSA9IDA7XG4gIGxldCBvZmZzZXRYID0gMDtcbiAgbGV0IG9mZnNldFkgPSAwO1xuICBub2RlLmRyYWdnYWJsZSA9IGZhbHNlO1xuICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGUgPT4ge1xuICAgIGlmICghbm9kZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFnZ2luZyA9IHRydWU7XG4gICAgc3RhcnRYID0gc3RhcnRYR2V0dGVyKCk7XG4gICAgc3RhcnRZID0gc3RhcnRZR2V0dGVyKCk7XG4gICAgb2Zmc2V0WCA9IGUucGFnZVg7XG4gICAgb2Zmc2V0WSA9IGUucGFnZVk7XG4gIH0pO1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZSA9PiB7XG4gICAgaWYgKCFub2RlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghZHJhZ2dpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgb25VcGRhdGUoZS5wYWdlWCAtIG9mZnNldFggKyBzdGFydFgsIGUucGFnZVkgLSBvZmZzZXRZICsgc3RhcnRZKTtcbiAgfSk7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZSA9PiB7XG4gICAgaWYgKCFub2RlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghZHJhZ2dpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhZ2dpbmcgPSBmYWxzZTtcbiAgfSk7XG59IiwiZXhwb3J0ICogZnJvbSAnLi9tZXNzYWdlJztcbmV4cG9ydCAqIGZyb20gJy4vZHJhZ2dlcic7XG5leHBvcnQgKiBmcm9tICcuL3N0b3JhZ2UnO1xuZXhwb3J0ICogZnJvbSAnLi9jaHJvbWUnO1xuZXhwb3J0ICogZnJvbSAnLi90b29scyc7XG4vLyBlZGl0b3Ig5Y2V54us5byVIiwiZXhwb3J0IGZ1bmN0aW9uIG9uUnVudGltZU1lc3NhZ2UoY2hhbm5lbCwgY2FsbGJhY2spIHtcbiAgY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGZ1bmN0aW9uIChyZXF1ZXN0LCBzZW5kZXIsIHJlc3BvbnNlKSB7XG4gICAgaWYgKHJlcXVlc3QuY2hhbm5lbCAhPT0gY2hhbm5lbCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY2FsbGJhY2socmVxdWVzdC5kYXRhLCBzZW5kZXIsIHJlc3BvbnNlKTtcbiAgICB9LCAxKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSk7XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VuZFJ1bnRpbWVNZXNzYWdlKGNoYW5uZWwsIGRhdGEsIG9uUmVzcG9uc2UpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKHJlcyA9PiB7XG4gICAgaWYgKG9uUmVzcG9uc2UpIHtcbiAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICAgICAgY2hhbm5lbCxcbiAgICAgICAgZGF0YVxuICAgICAgfSwgZGF0YSA9PiB7XG4gICAgICAgIG9uUmVzcG9uc2UoZGF0YSk7XG4gICAgICAgIHJlcyhkYXRhKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICAgIGNoYW5uZWwsXG4gICAgICAgIGRhdGFcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gc2VuZFRhYk1lc3NhZ2UoY2hhbm5lbCwgdGFiSWQsIGRhdGEpIHtcbiAgcmV0dXJuIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKHRhYklkLCB7XG4gICAgY2hhbm5lbCxcbiAgICBkYXRhXG4gIH0pO1xufSIsImltcG9ydCB7IGN1cnJlbnRFbnYsIEV4ZWNFbnYgfSBmcm9tICcuL2Nocm9tZSc7XG4vLyBzdG9yYWdlID09PT09PT09PT09PT1cbmV4cG9ydCBmdW5jdGlvbiBnZXRMb2NhbFN0b3JhZ2UobmFtZSwgZGVmYXVsdFZhbHVlKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShyZXMgPT4ge1xuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChuYW1lLCBycyA9PiByZXMocnM/LltuYW1lXSA/PyBkZWZhdWx0VmFsdWUpKTtcbiAgfSk7XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2V0TG9jYWxTdG9yYWdlKG5hbWUsIHZhbHVlKSB7XG4gIGF3YWl0IGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7XG4gICAgW25hbWVdOiB2YWx1ZVxuICB9KTtcbn1cbmNvbnN0IHN0b3JhZ2VIYW5kbGVyU3RvcmUgPSBuZXcgTWFwKCk7XG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJTdG9yYWdlKGtleSwgaGFuZGxlcikge1xuICBzdG9yYWdlSGFuZGxlclN0b3JlLnNldChrZXksIGhhbmRsZXIpO1xuICBpZiAoY3VycmVudEVudiAhPT0gRXhlY0Vudi5Db250ZW50KSB7XG4gICAgY29uc29sZS5sb2coYFtzdG9yYWdlXSByZWdpc3RlciBtb2R1bGU6ICR7a2V5fWApO1xuICB9XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U3RvcmFnZUV4cG9ydERhdGEoKSB7XG4gIGNvbnN0IGRhdGEgPSB7fTtcbiAgZm9yIChsZXQgW2tleSwgaGFuZGxlcl0gb2Ygc3RvcmFnZUhhbmRsZXJTdG9yZSkge1xuICAgIGlmIChoYW5kbGVyKSB7XG4gICAgICBkYXRhW2tleV0gPSBhd2FpdCBoYW5kbGVyLm9uRXhwb3J0KCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShkYXRhLCBudWxsLCA0KTtcbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZXRTdG9yYWdlSW1wb3J0RGF0YShkYXRhKSB7XG4gIGNvbnN0IGRhdGFPYmplY3QgPSBKU09OLnBhcnNlKGRhdGEpO1xuICBmb3IgKGxldCBba2V5LCBoYW5kbGVyXSBvZiBzdG9yYWdlSGFuZGxlclN0b3JlKSB7XG4gICAgY29uc3QgaW1wb3J0RGF0YSA9IGRhdGFPYmplY3Rba2V5XTtcbiAgICBpZiAoaW1wb3J0RGF0YSkge1xuICAgICAgYXdhaXQgaGFuZGxlcj8ub25JbXBvcnQoaW1wb3J0RGF0YSk7XG4gICAgfVxuICB9XG59IiwiZXhwb3J0IGZ1bmN0aW9uIGV2YWxTY3JpcHQoc2NyaXB0LCB2YXJPYmogPSB7fSkge1xuICBjb25zdCB2YXJOYW1lcyA9IFtdO1xuICBjb25zdCB2YXJEYXRhID0gW107XG4gIE9iamVjdC5lbnRyaWVzKHZhck9iaikuZm9yRWFjaCgoW25hbWUsIGRhdGFdKSA9PiB7XG4gICAgdmFyTmFtZXMucHVzaChuYW1lKTtcbiAgICB2YXJEYXRhLnB1c2goZGF0YSk7XG4gIH0pO1xuICByZXR1cm4gbmV3IEZ1bmN0aW9uKC4uLnZhck5hbWVzLCBgXCJ1c2Ugc3RyaWN0XCI7JHtzY3JpcHR9YCkoLi4udmFyRGF0YSk7XG59XG5leHBvcnQgZnVuY3Rpb24gJChzZWxlY3Rvcikge1xuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG59XG5leHBvcnQgZnVuY3Rpb24gZGVib3VuY2UoZm4sIGRlbGF5ID0gMzAwKSB7XG4gIGxldCB0aW1lciA9IHVuZGVmaW5lZDtcbiAgcmV0dXJuICguLi5hcmdzKSA9PiB7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4gZm4oLi4uYXJncyksIGRlbGF5KTtcbiAgfTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzbGVlcChuID0gMCkge1xuICByZXR1cm4gbmV3IFByb21pc2UocmVzID0+IHtcbiAgICBzZXRUaW1lb3V0KHJlcywgbik7XG4gIH0pO1xufVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvYWRJbWFnZShzcmMpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICByZXMoaW1nKTtcbiAgICB9O1xuICAgIGltZy5vbmVycm9yID0gcmVqO1xuICAgIGltZy5zcmMgPSBzcmM7XG4gIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGFycmF5R3JvdXBCeShhcnJheSwgY29uZGl0aW9uKSB7XG4gIGNvbnN0IG1hcCA9IG5ldyBNYXAoKTtcbiAgYXJyYXkuZm9yRWFjaChpdGVtID0+IHtcbiAgICBjb25zdCB2YWx1ZSA9IGNvbmRpdGlvbihpdGVtKTtcbiAgICBpZiAoIW1hcC5oYXModmFsdWUpKSB7XG4gICAgICBtYXAuc2V0KHZhbHVlLCBbXSk7XG4gICAgfVxuICAgIG1hcC5nZXQodmFsdWUpLnB1c2goaXRlbSk7XG4gIH0pO1xuICByZXR1cm4gWy4uLm1hcC52YWx1ZXMoKV07XG59XG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0VGVtcGxhdGUodGVtcGxhdGUpIHtcbiAgcmV0dXJuICQoJyNtYWluJykuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCB0ZW1wbGF0ZSk7XG59XG4vLyBleHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9hZFNjcmlwdChzcmM6IHN0cmluZykge1xuLy8gICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbi8vICAgICAgICAgY29uc3QgcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuLy8gICAgICAgICBzLnNyYyA9IHNyYztcbi8vICAgICAgICAgcy5vbmxvYWQgPSByZXM7XG4vLyAgICAgICAgIHMub25lcnJvciA9IHJlajtcbi8vICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzKTtcbi8vICAgICB9KTtcbi8vIH1cbmV4cG9ydCBmdW5jdGlvbiBkb3dubG9hZChmaWxlTmFtZSwgdXJsKSB7XG4gIGNvbnN0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gIGEuaHJlZiA9IHVybDtcbiAgYS5kb3dubG9hZCA9IGZpbGVOYW1lO1xuICBhLmNsaWNrKCk7XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVhZEZpbGUoZmlsZSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG4gICAgY29uc3QgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgZmlsZVJlYWRlci5yZWFkQXNUZXh0KGZpbGUpO1xuICAgIGZpbGVSZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgZmlsZUNvbnRlbnQgPSBmaWxlUmVhZGVyLnJlc3VsdDtcbiAgICAgIHJlcyhmaWxlQ29udGVudCk7XG4gICAgfTtcbiAgICBmaWxlUmVhZGVyLm9uZXJyb3IgPSByZWo7XG4gIH0pO1xufVxuZnVuY3Rpb24gdG9QcmVnKHVybFBhdHRlcm4pIHtcbiAgLy8g6L+Z6YeM5pyJ5Lqb54m55q6K5a2X56ym5Y+v6IO96ZyA6KaB5aSE55CG77yM5L6L5aaCP+S5i+exu+eahFxuICByZXR1cm4gbmV3IFJlZ0V4cChTdHJpbmcucmF3YF4ke3VybFBhdHRlcm59YC5yZXBsYWNlKC8oW1xcP10pL2csICdcXFxcJDEnKSk7XG59XG4vKipcbiAqIHVybCDpgJrphY3nrKbljLnphY3kvb/nlKhcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hdGNoVXJsKHVybCwgcGF0dGVybikge1xuICByZXR1cm4gdG9QcmVnKHBhdHRlcm4pLnRlc3QodXJsKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBtYXRjaFVybFBhdHRlcm4odXJsLCBpdGVtTGlzdCwgZ2V0VXJsKSB7XG4gIGxldCBtYXRjaCA9IHVuZGVmaW5lZDtcbiAgaXRlbUxpc3QubWFwKGl0ZW0gPT4gZ2V0VXJsKGl0ZW0pKS5mb3JFYWNoKCh1cmxQYXR0ZXJuLCBpbmRleCkgPT4ge1xuICAgIC8vIOWMuemFjeiAjOS4lOavlOS5i+WJjW1hdGNo55qE5pu06ZW/XG4gICAgaWYgKG1hdGNoVXJsKHVybCwgdXJsUGF0dGVybikgJiYgKCFtYXRjaCB8fCB1cmxQYXR0ZXJuLmxlbmd0aCA+IGdldFVybChtYXRjaCkubGVuZ3RoKSkge1xuICAgICAgbWF0Y2ggPSBpdGVtTGlzdFtpbmRleF07XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIG1hdGNoO1xufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4uLy4uLy5jb25maWcveWFybi9nbG9iYWwvbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qc1wiKTtcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2JhY2tncm91bmQvYmFja2dyb3VuZC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==