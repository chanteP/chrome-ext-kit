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

/***/ "./src/content/index.ts":
/*!******************************!*\
  !*** ./src/content/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_scriptRule_content__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/scriptRule/content */ "./src/modules/scriptRule/content.ts");
/* harmony import */ var _modules_overlay_content__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/overlay/content */ "./src/modules/overlay/content.ts");



/***/ }),

/***/ "./src/modules/overlay/content.ts":
/*!****************************************!*\
  !*** ./src/modules/overlay/content.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "./src/utils/index.ts");
/* harmony import */ var _utils_dragger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/dragger */ "./src/utils/dragger.ts");


let coverImage = null;
let currentTabId = null;
let state = {
  base64: '',
  enable: false,
  left: 0,
  top: 0,
  opacity: 0,
  scale: 1,
  equivalScale: 1
};
function updatePosition(left, top) {
  state.left = left;
  state.top = top;
  (0,_utils__WEBPACK_IMPORTED_MODULE_0__.sendRuntimeMessage)('setOverlayCapture', [currentTabId, state]);
}
function buildImage() {
  if (coverImage) {
    return coverImage;
  }
  const img = new Image();
  img.style.cssText = `
        position: fixed;
        display: block;
        top: 0;
        left: 0;
        z-index: 99999999;
        transform-origin: left top;
        pointer-events: none;
        opacity: .3;
    `;
  document.body.appendChild(img);
  bindEvent(img);
  coverImage = img;
  return coverImage;
}
function updateStyle() {
  const cover = coverImage;
  if (!cover) {
    return;
  }
  // console.log('state', state);
  cover.style.opacity = String(state.opacity ?? 0.5);
  cover.style.transform = `scale(${state.scale / state.equivalScale})`;
  cover.style.left = `${state.left / state.equivalScale}px`;
  cover.style.top = `${state.top / state.equivalScale}px`;
  cover.src = state.base64;
}
function updateCoverImage(data) {
  const {
    base64,
    enable,
    opacity,
    scale,
    left,
    top
  } = data ?? {
    enable: false
  };
  Object.assign(state, data);
  if (!coverImage && !enable) {
    return;
  }
  const cover = buildImage();
  // cover.style.pointerEvents = enable ? '' : 'none';
  cover.style.display = enable ? 'block' : 'none';
  if (!enable) {
    return;
  }
  updateStyle();
}
function bindEvent(node) {
  (0,_utils_dragger__WEBPACK_IMPORTED_MODULE_1__.bindDragger)(node, () => node.getBoundingClientRect().left, () => node.getBoundingClientRect().top, (l, t) => {
    updatePosition(l, t);
    updateStyle();
  });
  window.addEventListener('keydown', e => {
    const offset = e.altKey ? 10 : 1;
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        state.top += offset;
        break;
      case 'ArrowDown':
        e.preventDefault();
        state.top -= offset;
        break;
      case 'ArrowRight':
        e.preventDefault();
        state.left += offset;
        break;
      case 'ArrowLeft':
        e.preventDefault();
        state.left -= offset;
        break;
      case "'":
        state.enable = !state.enable;
        updateCoverImage(state);
        break;
      default:
        return;
    }
    updatePosition(state.left, state.top);
    updateStyle();
  });
}
async function run(tabId) {
  currentTabId = tabId;
  (0,_utils__WEBPACK_IMPORTED_MODULE_0__.sendRuntimeMessage)('getOverlayCapture', [tabId], data => {
    // const { base64, enable } = data ?? {};
    // console.log('streamId', base64?.length, enable);
    updateCoverImage(data);
  });
}
(0,_utils__WEBPACK_IMPORTED_MODULE_0__.sendRuntimeMessage)('tabInfo', [], tabId => {
  run(tabId);
});
(0,_utils__WEBPACK_IMPORTED_MODULE_0__.onRuntimeMessage)('updateOverlayCapture', _ref => {
  let [data] = _ref;
  // const { base64, enable } = data ?? {};
  // console.log('updateOverlayCapture', base64?.length, enable);
  updateCoverImage(data);
});

/***/ }),

/***/ "./src/modules/scriptRule/content.ts":
/*!*******************************************!*\
  !*** ./src/modules/scriptRule/content.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "./src/utils/index.ts");
/* harmony import */ var _scriptRule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scriptRule */ "./src/modules/scriptRule/scriptRule.ts");


async function run(tabId) {
  const {
    hostname: domain,
    port,
    pathname: path,
    search: query,
    hash
  } = location;
  let rule = await _scriptRule__WEBPACK_IMPORTED_MODULE_1__.scriptRules.match(`${domain}${port ? `:${port}` : ''}${path}${query}${hash}`);
  if (!rule?.enable) {
    return;
  }
  // const tab = await getCurrentTab();
  document.addEventListener('DOMContentLoaded', function () {
    rule.styles && insertStyles(rule.styles);
  });
  // rule!.scripts && sendRuntimeMessage('execScript', [rule!.scripts]);
  window.addEventListener('load', async function evalContentScript() {
    // rule!.scripts && chrome.scripting.executeScript({ func: () => eval(rule!.scripts) });
    // rule!.scripts && sendRuntimeMessage('execScript', [rule!.scripts]);
    rule.scripts && (0,_utils__WEBPACK_IMPORTED_MODULE_0__.evalScript)(rule.scripts);
    // insertScript(rule!.scripts);
  }, {
    once: true
  });
}
(0,_utils__WEBPACK_IMPORTED_MODULE_0__.sendRuntimeMessage)('tabInfo', [], tabId => {
  run(tabId);
});
function insertStyles(styles) {
  // TODO 使用stylesheets添加
  const styleTag = document.createElement('style');
  styleTag.dataset.insertStyles = '1';
  styleTag.innerHTML = styles;
  document.body.appendChild(styleTag);
}
function insertScript(code) {
  const elem = document.createElement('script');
  elem.textContent = code;
  document.head.appendChild(elem);
}

/***/ }),

/***/ "./src/modules/scriptRule/scriptRule.ts":
/*!**********************************************!*\
  !*** ./src/modules/scriptRule/scriptRule.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "scriptRules": () => (/* binding */ scriptRules)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "./src/utils/index.ts");

const storageKey = 'scriptRules';
class ScriptRule {
  saveType = 'local';
  toPreg(ruleName) {
    return new RegExp(String.raw`^${ruleName}`);
  }
  async getAllRules() {
    return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getLocalStorage)(storageKey, {});
    // return new Promise((res) => {
    //     chrome.storage[this.saveType].get('scriptRules', (rs) => res(rs?.scriptRules ?? {}));
    // });
  }

  async setAllRules(rules) {
    (0,_utils__WEBPACK_IMPORTED_MODULE_0__.setLocalStorage)(storageKey, rules);
    // chrome.storage[this.saveType].set({
    //     scriptRules: rules,
    // });
  }

  async set(ruleName, _ref) {
    let {
      styles,
      scripts,
      enable = true
    } = _ref;
    if (!ruleName) {
      return;
    }
    let rules = await this.getAllRules();
    rules[ruleName] = {
      enable,
      styles,
      scripts,
      name: ruleName
    };
    (0,_utils__WEBPACK_IMPORTED_MODULE_0__.setLocalStorage)(storageKey, rules);
    // chrome.storage[this.saveType].set({ scriptRules: rules });
  }

  async get(ruleName) {
    let rules = await this.getAllRules();
    return rules[ruleName];
  }
  async remove(ruleName) {
    let rules = await this.getAllRules();
    delete rules[ruleName];
    (0,_utils__WEBPACK_IMPORTED_MODULE_0__.setLocalStorage)(storageKey, rules);
    // chrome.storage[this.saveType].set({ scriptRules: rules });
  }

  async match(url) {
    let rules = await this.getAllRules();
    let ruleList = Object.keys(rules);
    let match = null;
    ruleList.forEach(ruleName => {
      let rule = rules[ruleName];
      // 匹配而且比之前match的更长
      if (this.toPreg(rule.name).test(url) && (!match || rule.name.length > rules[match].name.length)) {
        match = ruleName;
      }
    });
    return rules[match];
  }
}
const scriptRules = new ScriptRule();
(0,_utils__WEBPACK_IMPORTED_MODULE_0__.registerStorage)(storageKey, {
  onExport: async () => {
    const data = await (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getLocalStorage)(storageKey, {});
    return data;
  },
  onImport: async data => {
    await (0,_utils__WEBPACK_IMPORTED_MODULE_0__.setLocalStorage)(storageKey, data);
  }
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/content/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzdC9jb250ZW50LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN2b0JBOzs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM1SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDM0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDcEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBOzs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBRU5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ucC1jaHJvbWUtZXh0ZW5zaW9uLy4uLy4uLy4uLy5jb25maWcveWFybi9nbG9iYWwvbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyIsIndlYnBhY2s6Ly9ucC1jaHJvbWUtZXh0ZW5zaW9uLy4vc3JjL2NvbnRlbnQvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbnAtY2hyb21lLWV4dGVuc2lvbi8uL3NyYy9tb2R1bGVzL292ZXJsYXkvY29udGVudC50cyIsIndlYnBhY2s6Ly9ucC1jaHJvbWUtZXh0ZW5zaW9uLy4vc3JjL21vZHVsZXMvc2NyaXB0UnVsZS9jb250ZW50LnRzIiwid2VicGFjazovL25wLWNocm9tZS1leHRlbnNpb24vLi9zcmMvbW9kdWxlcy9zY3JpcHRSdWxlL3NjcmlwdFJ1bGUudHMiLCJ3ZWJwYWNrOi8vbnAtY2hyb21lLWV4dGVuc2lvbi8uL3NyYy91dGlscy9jaHJvbWUudHMiLCJ3ZWJwYWNrOi8vbnAtY2hyb21lLWV4dGVuc2lvbi8uL3NyYy91dGlscy9kcmFnZ2VyLnRzIiwid2VicGFjazovL25wLWNocm9tZS1leHRlbnNpb24vLi9zcmMvdXRpbHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbnAtY2hyb21lLWV4dGVuc2lvbi8uL3NyYy91dGlscy9tZXNzYWdlLnRzIiwid2VicGFjazovL25wLWNocm9tZS1leHRlbnNpb24vLi9zcmMvdXRpbHMvc3RvcmFnZS50cyIsIndlYnBhY2s6Ly9ucC1jaHJvbWUtZXh0ZW5zaW9uLy4vc3JjL3V0aWxzL3Rvb2xzLnRzIiwid2VicGFjazovL25wLWNocm9tZS1leHRlbnNpb24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbnAtY2hyb21lLWV4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbnAtY2hyb21lLWV4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25wLWNocm9tZS1leHRlbnNpb24vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9ucC1jaHJvbWUtZXh0ZW5zaW9uL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vbnAtY2hyb21lLWV4dGVuc2lvbi93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vbnAtY2hyb21lLWV4dGVuc2lvbi93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cbnZhciBydW50aW1lID0gZnVuY3Rpb24gKGV4cG9ydHMpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIE9wID0gT2JqZWN0LnByb3RvdHlwZTtcbiAgdmFyIGhhc093biA9IE9wLmhhc093blByb3BlcnR5O1xuICB2YXIgZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkgfHwgZnVuY3Rpb24gKG9iaiwga2V5LCBkZXNjKSB7XG4gICAgb2JqW2tleV0gPSBkZXNjLnZhbHVlO1xuICB9O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cbiAgdmFyICRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2wgOiB7fTtcbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcbiAgdmFyIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIjtcbiAgdmFyIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcbiAgZnVuY3Rpb24gZGVmaW5lKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIG9ialtrZXldO1xuICB9XG4gIHRyeSB7XG4gICAgLy8gSUUgOCBoYXMgYSBicm9rZW4gT2JqZWN0LmRlZmluZVByb3BlcnR5IHRoYXQgb25seSB3b3JrcyBvbiBET00gb2JqZWN0cy5cbiAgICBkZWZpbmUoe30sIFwiXCIpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBkZWZpbmUgPSBmdW5jdGlvbiAob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgICByZXR1cm4gb2JqW2tleV0gPSB2YWx1ZTtcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBJZiBvdXRlckZuIHByb3ZpZGVkIGFuZCBvdXRlckZuLnByb3RvdHlwZSBpcyBhIEdlbmVyYXRvciwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci5cbiAgICB2YXIgcHJvdG9HZW5lcmF0b3IgPSBvdXRlckZuICYmIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gb3V0ZXJGbiA6IEdlbmVyYXRvcjtcbiAgICB2YXIgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShwcm90b0dlbmVyYXRvci5wcm90b3R5cGUpO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pO1xuICAgIC8vIFRoZSAuX2ludm9rZSBtZXRob2QgdW5pZmllcyB0aGUgaW1wbGVtZW50YXRpb25zIG9mIHRoZSAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMuXG4gICAgZGVmaW5lUHJvcGVydHkoZ2VuZXJhdG9yLCBcIl9pbnZva2VcIiwge1xuICAgICAgdmFsdWU6IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dClcbiAgICB9KTtcbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG4gIGV4cG9ydHMud3JhcCA9IHdyYXA7XG4gIC8vIFRyeS9jYXRjaCBoZWxwZXIgdG8gbWluaW1pemUgZGVvcHRpbWl6YXRpb25zLiBSZXR1cm5zIGEgY29tcGxldGlvblxuICAvLyByZWNvcmQgbGlrZSBjb250ZXh0LnRyeUVudHJpZXNbaV0uY29tcGxldGlvbi4gVGhpcyBpbnRlcmZhY2UgY291bGRcbiAgLy8gaGF2ZSBiZWVuIChhbmQgd2FzIHByZXZpb3VzbHkpIGRlc2lnbmVkIHRvIHRha2UgYSBjbG9zdXJlIHRvIGJlXG4gIC8vIGludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIGJ1dCBpbiBhbGwgdGhlIGNhc2VzIHdlIGNhcmUgYWJvdXQgd2VcbiAgLy8gYWxyZWFkeSBoYXZlIGFuIGV4aXN0aW5nIG1ldGhvZCB3ZSB3YW50IHRvIGNhbGwsIHNvIHRoZXJlJ3Mgbm8gbmVlZFxuICAvLyB0byBjcmVhdGUgYSBuZXcgZnVuY3Rpb24gb2JqZWN0LiBXZSBjYW4gZXZlbiBnZXQgYXdheSB3aXRoIGFzc3VtaW5nXG4gIC8vIHRoZSBtZXRob2QgdGFrZXMgZXhhY3RseSBvbmUgYXJndW1lbnQsIHNpbmNlIHRoYXQgaGFwcGVucyB0byBiZSB0cnVlXG4gIC8vIGluIGV2ZXJ5IGNhc2UsIHNvIHdlIGRvbid0IGhhdmUgdG8gdG91Y2ggdGhlIGFyZ3VtZW50cyBvYmplY3QuIFRoZVxuICAvLyBvbmx5IGFkZGl0aW9uYWwgYWxsb2NhdGlvbiByZXF1aXJlZCBpcyB0aGUgY29tcGxldGlvbiByZWNvcmQsIHdoaWNoXG4gIC8vIGhhcyBhIHN0YWJsZSBzaGFwZSBhbmQgc28gaG9wZWZ1bGx5IHNob3VsZCBiZSBjaGVhcCB0byBhbGxvY2F0ZS5cbiAgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IFwibm9ybWFsXCIsXG4gICAgICAgIGFyZzogZm4uY2FsbChvYmosIGFyZylcbiAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBcInRocm93XCIsXG4gICAgICAgIGFyZzogZXJyXG4gICAgICB9O1xuICAgIH1cbiAgfVxuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRTdGFydCA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkWWllbGQgPSBcInN1c3BlbmRlZFlpZWxkXCI7XG4gIHZhciBHZW5TdGF0ZUV4ZWN1dGluZyA9IFwiZXhlY3V0aW5nXCI7XG4gIHZhciBHZW5TdGF0ZUNvbXBsZXRlZCA9IFwiY29tcGxldGVkXCI7XG4gIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuICAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuICAvLyBUaGlzIGlzIGEgcG9seWZpbGwgZm9yICVJdGVyYXRvclByb3RvdHlwZSUgZm9yIGVudmlyb25tZW50cyB0aGF0XG4gIC8vIGRvbid0IG5hdGl2ZWx5IHN1cHBvcnQgaXQuXG4gIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuICBkZWZpbmUoSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pO1xuICB2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG4gIHZhciBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvICYmIGdldFByb3RvKGdldFByb3RvKHZhbHVlcyhbXSkpKTtcbiAgaWYgKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPcCAmJiBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpKSB7XG4gICAgLy8gVGhpcyBlbnZpcm9ubWVudCBoYXMgYSBuYXRpdmUgJUl0ZXJhdG9yUHJvdG90eXBlJTsgdXNlIGl0IGluc3RlYWRcbiAgICAvLyBvZiB0aGUgcG9seWZpbGwuXG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxuICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPSBHZW5lcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSk7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICBkZWZpbmVQcm9wZXJ0eShHcCwgXCJjb25zdHJ1Y3RvclwiLCB7XG4gICAgdmFsdWU6IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KTtcbiAgZGVmaW5lUHJvcGVydHkoR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsIFwiY29uc3RydWN0b3JcIiwge1xuICAgIHZhbHVlOiBHZW5lcmF0b3JGdW5jdGlvbixcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfSk7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gZGVmaW5lKEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JGdW5jdGlvblwiKTtcbiAgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcbiAgICAgIGRlZmluZShwcm90b3R5cGUsIG1ldGhvZCwgZnVuY3Rpb24gKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uIChnZW5GdW4pIHtcbiAgICB2YXIgY3RvciA9IHR5cGVvZiBnZW5GdW4gPT09IFwiZnVuY3Rpb25cIiAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIGN0b3IgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fFxuICAgIC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAvLyBkbyBpcyB0byBjaGVjayBpdHMgLm5hbWUgcHJvcGVydHkuXG4gICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiIDogZmFsc2U7XG4gIH07XG4gIGV4cG9ydHMubWFyayA9IGZ1bmN0aW9uIChnZW5GdW4pIHtcbiAgICBpZiAoT2JqZWN0LnNldFByb3RvdHlwZU9mKSB7XG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICAgIGRlZmluZShnZW5GdW4sIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvckZ1bmN0aW9uXCIpO1xuICAgIH1cbiAgICBnZW5GdW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcCk7XG4gICAgcmV0dXJuIGdlbkZ1bjtcbiAgfTtcbiAgLy8gV2l0aGluIHRoZSBib2R5IG9mIGFueSBhc3luYyBmdW5jdGlvbiwgYGF3YWl0IHhgIGlzIHRyYW5zZm9ybWVkIHRvXG4gIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gIC8vIGBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpYCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC5cbiAgZXhwb3J0cy5hd3JhcCA9IGZ1bmN0aW9uIChhcmcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgX19hd2FpdDogYXJnXG4gICAgfTtcbiAgfTtcbiAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcihnZW5lcmF0b3IsIFByb21pc2VJbXBsKSB7XG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpO1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmc7XG4gICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgaW52b2tlKFwidGhyb3dcIiwgZXJyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uICh1bndyYXBwZWQpIHtcbiAgICAgICAgICAvLyBXaGVuIGEgeWllbGRlZCBQcm9taXNlIGlzIHJlc29sdmVkLCBpdHMgZmluYWwgdmFsdWUgYmVjb21lc1xuICAgICAgICAgIC8vIHRoZSAudmFsdWUgb2YgdGhlIFByb21pc2U8e3ZhbHVlLGRvbmV9PiByZXN1bHQgZm9yIHRoZVxuICAgICAgICAgIC8vIGN1cnJlbnQgaXRlcmF0aW9uLlxuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZDtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgIC8vIElmIGEgcmVqZWN0ZWQgUHJvbWlzZSB3YXMgeWllbGRlZCwgdGhyb3cgdGhlIHJlamVjdGlvbiBiYWNrXG4gICAgICAgICAgLy8gaW50byB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIHNvIGl0IGNhbiBiZSBoYW5kbGVkIHRoZXJlLlxuICAgICAgICAgIHJldHVybiBpbnZva2UoXCJ0aHJvd1wiLCBlcnJvciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZUltcGwoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcHJldmlvdXNQcm9taXNlID1cbiAgICAgIC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgIC8vIGFsbCBwcmV2aW91cyBQcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQgYmVmb3JlIGNhbGxpbmcgaW52b2tlLFxuICAgICAgLy8gc28gdGhhdCByZXN1bHRzIGFyZSBhbHdheXMgZGVsaXZlcmVkIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBJZlxuICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgIC8vIGNhbGwgaW52b2tlIGltbWVkaWF0ZWx5LCB3aXRob3V0IHdhaXRpbmcgb24gYSBjYWxsYmFjayB0byBmaXJlLFxuICAgICAgLy8gc28gdGhhdCB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhcyB0aGUgb3Bwb3J0dW5pdHkgdG8gZG9cbiAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgIC8vIGlzIHdoeSB0aGUgUHJvbWlzZSBjb25zdHJ1Y3RvciBzeW5jaHJvbm91c2x5IGludm9rZXMgaXRzXG4gICAgICAvLyBleGVjdXRvciBjYWxsYmFjaywgYW5kIHdoeSBhc3luYyBmdW5jdGlvbnMgc3luY2hyb25vdXNseVxuICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBhc3luYyBnZW5lcmF0b3JzLCBpdCBpcyBlc3BlY2lhbGx5XG4gICAgICAvLyBpbXBvcnRhbnQgdG8gZ2V0IHRoaXMgcmlnaHQsIGV2ZW4gdGhvdWdoIGl0IHJlcXVpcmVzIGNhcmUuXG4gICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyxcbiAgICAgIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5IGxhdGVyXG4gICAgICAvLyBpbnZvY2F0aW9ucyBvZiB0aGUgaXRlcmF0b3IuXG4gICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZykgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgIH1cbiAgICAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuICAgIGRlZmluZVByb3BlcnR5KHRoaXMsIFwiX2ludm9rZVwiLCB7XG4gICAgICB2YWx1ZTogZW5xdWV1ZVxuICAgIH0pO1xuICB9XG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSk7XG4gIGRlZmluZShBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSwgYXN5bmNJdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KTtcbiAgZXhwb3J0cy5Bc3luY0l0ZXJhdG9yID0gQXN5bmNJdGVyYXRvcjtcbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIGV4cG9ydHMuYXN5bmMgPSBmdW5jdGlvbiAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QsIFByb21pc2VJbXBsKSB7XG4gICAgaWYgKFByb21pc2VJbXBsID09PSB2b2lkIDApIFByb21pc2VJbXBsID0gUHJvbWlzZTtcbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpLCBQcm9taXNlSW1wbCk7XG4gICAgcmV0dXJuIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKSA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLlxuICAgIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICB9KTtcbiAgfTtcbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcbiAgICByZXR1cm4gZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlRXhlY3V0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICB9XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgfVxuICAgICAgICAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgIGNvbnRleHQuYXJnID0gYXJnO1xuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgdmFyIGRlbGVnYXRlUmVzdWx0ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG4gICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlUmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgLy8gU2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gY29udGV4dC5hcmc7XG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydCkge1xuICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAgIHRocm93IGNvbnRleHQuYXJnO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgfVxuICAgICAgICBzdGF0ZSA9IEdlblN0YXRlRXhlY3V0aW5nO1xuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmUgPyBHZW5TdGF0ZUNvbXBsZXRlZCA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG4gICAgICAgICAgaWYgKHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgIC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cbiAgLy8gQ2FsbCBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF0oY29udGV4dC5hcmcpIGFuZCBoYW5kbGUgdGhlXG4gIC8vIHJlc3VsdCwgZWl0aGVyIGJ5IHJldHVybmluZyBhIHsgdmFsdWUsIGRvbmUgfSByZXN1bHQgZnJvbSB0aGVcbiAgLy8gZGVsZWdhdGUgaXRlcmF0b3IsIG9yIGJ5IG1vZGlmeWluZyBjb250ZXh0Lm1ldGhvZCBhbmQgY29udGV4dC5hcmcsXG4gIC8vIHNldHRpbmcgY29udGV4dC5kZWxlZ2F0ZSB0byBudWxsLCBhbmQgcmV0dXJuaW5nIHRoZSBDb250aW51ZVNlbnRpbmVsLlxuICBmdW5jdGlvbiBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIG1ldGhvZE5hbWUgPSBjb250ZXh0Lm1ldGhvZDtcbiAgICB2YXIgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbbWV0aG9kTmFtZV07XG4gICAgaWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBBIC50aHJvdyBvciAucmV0dXJuIHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyAudGhyb3dcbiAgICAgIC8vIG1ldGhvZCwgb3IgYSBtaXNzaW5nIC5uZXh0IG1laHRvZCwgYWx3YXlzIHRlcm1pbmF0ZSB0aGVcbiAgICAgIC8vIHlpZWxkKiBsb29wLlxuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICAvLyBOb3RlOiBbXCJyZXR1cm5cIl0gbXVzdCBiZSB1c2VkIGZvciBFUzMgcGFyc2luZyBjb21wYXRpYmlsaXR5LlxuICAgICAgaWYgKG1ldGhvZE5hbWUgPT09IFwidGhyb3dcIiAmJiBkZWxlZ2F0ZS5pdGVyYXRvcltcInJldHVyblwiXSkge1xuICAgICAgICAvLyBJZiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIGEgcmV0dXJuIG1ldGhvZCwgZ2l2ZSBpdCBhXG4gICAgICAgIC8vIGNoYW5jZSB0byBjbGVhbiB1cC5cbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG4gICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgLy8gSWYgbWF5YmVJbnZva2VEZWxlZ2F0ZShjb250ZXh0KSBjaGFuZ2VkIGNvbnRleHQubWV0aG9kIGZyb21cbiAgICAgICAgICAvLyBcInJldHVyblwiIHRvIFwidGhyb3dcIiwgbGV0IHRoYXQgb3ZlcnJpZGUgdGhlIFR5cGVFcnJvciBiZWxvdy5cbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1ldGhvZE5hbWUgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIlRoZSBpdGVyYXRvciBkb2VzIG5vdCBwcm92aWRlIGEgJ1wiICsgbWV0aG9kTmFtZSArIFwiJyBtZXRob2RcIik7XG4gICAgICB9XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKG1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGNvbnRleHQuYXJnKTtcbiAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG4gICAgaWYgKCFpbmZvKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgLy8gQXNzaWduIHRoZSByZXN1bHQgb2YgdGhlIGZpbmlzaGVkIGRlbGVnYXRlIHRvIHRoZSB0ZW1wb3JhcnlcbiAgICAgIC8vIHZhcmlhYmxlIHNwZWNpZmllZCBieSBkZWxlZ2F0ZS5yZXN1bHROYW1lIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTtcbiAgICAgIC8vIFJlc3VtZSBleGVjdXRpb24gYXQgdGhlIGRlc2lyZWQgbG9jYXRpb24gKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7XG4gICAgICAvLyBJZiBjb250ZXh0Lm1ldGhvZCB3YXMgXCJ0aHJvd1wiIGJ1dCB0aGUgZGVsZWdhdGUgaGFuZGxlZCB0aGVcbiAgICAgIC8vIGV4Y2VwdGlvbiwgbGV0IHRoZSBvdXRlciBnZW5lcmF0b3IgcHJvY2VlZCBub3JtYWxseS4gSWZcbiAgICAgIC8vIGNvbnRleHQubWV0aG9kIHdhcyBcIm5leHRcIiwgZm9yZ2V0IGNvbnRleHQuYXJnIHNpbmNlIGl0IGhhcyBiZWVuXG4gICAgICAvLyBcImNvbnN1bWVkXCIgYnkgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yLiBJZiBjb250ZXh0Lm1ldGhvZCB3YXNcbiAgICAgIC8vIFwicmV0dXJuXCIsIGFsbG93IHRoZSBvcmlnaW5hbCAucmV0dXJuIGNhbGwgdG8gY29udGludWUgaW4gdGhlXG4gICAgICAvLyBvdXRlciBnZW5lcmF0b3IuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlLXlpZWxkIHRoZSByZXN1bHQgcmV0dXJuZWQgYnkgdGhlIGRlbGVnYXRlIG1ldGhvZC5cbiAgICAgIHJldHVybiBpbmZvO1xuICAgIH1cbiAgICAvLyBUaGUgZGVsZWdhdGUgaXRlcmF0b3IgaXMgZmluaXNoZWQsIHNvIGZvcmdldCBpdCBhbmQgY29udGludWUgd2l0aFxuICAgIC8vIHRoZSBvdXRlciBnZW5lcmF0b3IuXG4gICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gIH1cbiAgLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuICBkZWZpbmUoR3AsIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvclwiKTtcbiAgLy8gQSBHZW5lcmF0b3Igc2hvdWxkIGFsd2F5cyByZXR1cm4gaXRzZWxmIGFzIHRoZSBpdGVyYXRvciBvYmplY3Qgd2hlbiB0aGVcbiAgLy8gQEBpdGVyYXRvciBmdW5jdGlvbiBpcyBjYWxsZWQgb24gaXQuIFNvbWUgYnJvd3NlcnMnIGltcGxlbWVudGF0aW9ucyBvZiB0aGVcbiAgLy8gaXRlcmF0b3IgcHJvdG90eXBlIGNoYWluIGluY29ycmVjdGx5IGltcGxlbWVudCB0aGlzLCBjYXVzaW5nIHRoZSBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0IHRvIG5vdCBiZSByZXR1cm5lZCBmcm9tIHRoaXMgY2FsbC4gVGhpcyBlbnN1cmVzIHRoYXQgZG9lc24ndCBoYXBwZW4uXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvaXNzdWVzLzI3NCBmb3IgbW9yZSBkZXRhaWxzLlxuICBkZWZpbmUoR3AsIGl0ZXJhdG9yU3ltYm9sLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pO1xuICBkZWZpbmUoR3AsIFwidG9TdHJpbmdcIiwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9KTtcbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7XG4gICAgICB0cnlMb2M6IGxvY3NbMF1cbiAgICB9O1xuICAgIGlmICgxIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXTtcbiAgICB9XG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307XG4gICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiO1xuICAgIGRlbGV0ZSByZWNvcmQuYXJnO1xuICAgIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3tcbiAgICAgIHRyeUxvYzogXCJyb290XCJcbiAgICB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuICBleHBvcnRzLmtleXMgPSBmdW5jdGlvbiAodmFsKSB7XG4gICAgdmFyIG9iamVjdCA9IE9iamVjdCh2YWwpO1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIGtleXMucmV2ZXJzZSgpO1xuICAgIC8vIFJhdGhlciB0aGFuIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCBhIG5leHQgbWV0aG9kLCB3ZSBrZWVwXG4gICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cbiAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9O1xuICB9O1xuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlLm5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICB9XG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSxcbiAgICAgICAgICBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkge1xuICAgICAgICAgICAgICAgIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXTtcbiAgICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuICAgIHJldHVybiB7XG4gICAgICBuZXh0OiBkb25lUmVzdWx0XG4gICAgfTtcbiAgfVxuICBleHBvcnRzLnZhbHVlcyA9IHZhbHVlcztcbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgIGRvbmU6IHRydWVcbiAgICB9O1xuICB9XG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuICAgIHJlc2V0OiBmdW5jdGlvbiAoc2tpcFRlbXBSZXNldCkge1xuICAgICAgdGhpcy5wcmV2ID0gMDtcbiAgICAgIHRoaXMubmV4dCA9IDA7XG4gICAgICAvLyBSZXNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG4gICAgICBpZiAoIXNraXBUZW1wUmVzZXQpIHtcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgICAgLy8gTm90IHN1cmUgYWJvdXQgdGhlIG9wdGltYWwgb3JkZXIgb2YgdGhlc2UgY29uZGl0aW9uczpcbiAgICAgICAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT09IFwidFwiICYmIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmICFpc05hTigrbmFtZS5zbGljZSgxKSkpIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBzdG9wOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuICAgICAgdmFyIHJvb3RFbnRyeSA9IHRoaXMudHJ5RW50cmllc1swXTtcbiAgICAgIHZhciByb290UmVjb3JkID0gcm9vdEVudHJ5LmNvbXBsZXRpb247XG4gICAgICBpZiAocm9vdFJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uIChleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgICAgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgfVxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG4gICAgICAgIGlmIChjYXVnaHQpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gISFjYXVnaHQ7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKTtcbiAgICAgICAgICB2YXIgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG4gICAgICAgICAgaWYgKGhhc0NhdGNoICYmIGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgYWJydXB0OiBmdW5jdGlvbiAodHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiYgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJiB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmICh0eXBlID09PSBcImJyZWFrXCIgfHwgdHlwZSA9PT0gXCJjb250aW51ZVwiKSAmJiBmaW5hbGx5RW50cnkudHJ5TG9jIDw9IGFyZyAmJiBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gdHlwZTtcbiAgICAgIHJlY29yZC5hcmcgPSBhcmc7XG4gICAgICBpZiAoZmluYWxseUVudHJ5KSB7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jO1xuICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcbiAgICBjb21wbGV0ZTogZnVuY3Rpb24gKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJlY29yZC5hcmc7XG4gICAgICB9XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fCByZWNvcmQudHlwZSA9PT0gXCJjb250aW51ZVwiKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInJldHVyblwiKSB7XG4gICAgICAgIHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIiAmJiBhZnRlckxvYykge1xuICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgIH1cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH0sXG4gICAgZmluaXNoOiBmdW5jdGlvbiAoZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24gKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBUaGUgY29udGV4dC5jYXRjaCBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCB3aXRoIGEgbG9jYXRpb25cbiAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uIChpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH07XG4gICAgICBpZiAodGhpcy5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH07XG4gIC8vIFJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGVcbiAgLy8gb3Igbm90LCByZXR1cm4gdGhlIHJ1bnRpbWUgb2JqZWN0IHNvIHRoYXQgd2UgY2FuIGRlY2xhcmUgdGhlIHZhcmlhYmxlXG4gIC8vIHJlZ2VuZXJhdG9yUnVudGltZSBpbiB0aGUgb3V0ZXIgc2NvcGUsIHdoaWNoIGFsbG93cyB0aGlzIG1vZHVsZSB0byBiZVxuICAvLyBpbmplY3RlZCBlYXNpbHkgYnkgYGJpbi9yZWdlbmVyYXRvciAtLWluY2x1ZGUtcnVudGltZSBzY3JpcHQuanNgLlxuICByZXR1cm4gZXhwb3J0cztcbn0oXG4vLyBJZiB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGUsIHVzZSBtb2R1bGUuZXhwb3J0c1xuLy8gYXMgdGhlIHJlZ2VuZXJhdG9yUnVudGltZSBuYW1lc3BhY2UuIE90aGVyd2lzZSBjcmVhdGUgYSBuZXcgZW1wdHlcbi8vIG9iamVjdC4gRWl0aGVyIHdheSwgdGhlIHJlc3VsdGluZyBvYmplY3Qgd2lsbCBiZSB1c2VkIHRvIGluaXRpYWxpemVcbi8vIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgdmFyaWFibGUgYXQgdGhlIHRvcCBvZiB0aGlzIGZpbGUuXG50eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiID8gbW9kdWxlLmV4cG9ydHMgOiB7fSk7XG50cnkge1xuICByZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xufSBjYXRjaCAoYWNjaWRlbnRhbFN0cmljdE1vZGUpIHtcbiAgLy8gVGhpcyBtb2R1bGUgc2hvdWxkIG5vdCBiZSBydW5uaW5nIGluIHN0cmljdCBtb2RlLCBzbyB0aGUgYWJvdmVcbiAgLy8gYXNzaWdubWVudCBzaG91bGQgYWx3YXlzIHdvcmsgdW5sZXNzIHNvbWV0aGluZyBpcyBtaXNjb25maWd1cmVkLiBKdXN0XG4gIC8vIGluIGNhc2UgcnVudGltZS5qcyBhY2NpZGVudGFsbHkgcnVucyBpbiBzdHJpY3QgbW9kZSwgaW4gbW9kZXJuIGVuZ2luZXNcbiAgLy8gd2UgY2FuIGV4cGxpY2l0bHkgYWNjZXNzIGdsb2JhbFRoaXMuIEluIG9sZGVyIGVuZ2luZXMgd2UgY2FuIGVzY2FwZVxuICAvLyBzdHJpY3QgbW9kZSB1c2luZyBhIGdsb2JhbCBGdW5jdGlvbiBjYWxsLiBUaGlzIGNvdWxkIGNvbmNlaXZhYmx5IGZhaWxcbiAgLy8gaWYgYSBDb250ZW50IFNlY3VyaXR5IFBvbGljeSBmb3JiaWRzIHVzaW5nIEZ1bmN0aW9uLCBidXQgaW4gdGhhdCBjYXNlXG4gIC8vIHRoZSBwcm9wZXIgc29sdXRpb24gaXMgdG8gZml4IHRoZSBhY2NpZGVudGFsIHN0cmljdCBtb2RlIHByb2JsZW0uIElmXG4gIC8vIHlvdSd2ZSBtaXNjb25maWd1cmVkIHlvdXIgYnVuZGxlciB0byBmb3JjZSBzdHJpY3QgbW9kZSBhbmQgYXBwbGllZCBhXG4gIC8vIENTUCB0byBmb3JiaWQgRnVuY3Rpb24sIGFuZCB5b3UncmUgbm90IHdpbGxpbmcgdG8gZml4IGVpdGhlciBvZiB0aG9zZVxuICAvLyBwcm9ibGVtcywgcGxlYXNlIGRldGFpbCB5b3VyIHVuaXF1ZSBwcmVkaWNhbWVudCBpbiBhIEdpdEh1YiBpc3N1ZS5cbiAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSBcIm9iamVjdFwiKSB7XG4gICAgZ2xvYmFsVGhpcy5yZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xuICB9IGVsc2Uge1xuICAgIEZ1bmN0aW9uKFwiclwiLCBcInJlZ2VuZXJhdG9yUnVudGltZSA9IHJcIikocnVudGltZSk7XG4gIH1cbn0iLCJpbXBvcnQgJy4uL21vZHVsZXMvc2NyaXB0UnVsZS9jb250ZW50JztcbmltcG9ydCAnLi4vbW9kdWxlcy9vdmVybGF5L2NvbnRlbnQnOyIsImltcG9ydCB7IG9uUnVudGltZU1lc3NhZ2UsIHNlbmRSdW50aW1lTWVzc2FnZSB9IGZyb20gJy4uLy4uL3V0aWxzJztcbmltcG9ydCB7IGJpbmREcmFnZ2VyIH0gZnJvbSAnLi4vLi4vdXRpbHMvZHJhZ2dlcic7XG5sZXQgY292ZXJJbWFnZSA9IG51bGw7XG5sZXQgY3VycmVudFRhYklkID0gbnVsbDtcbmxldCBzdGF0ZSA9IHtcbiAgYmFzZTY0OiAnJyxcbiAgZW5hYmxlOiBmYWxzZSxcbiAgbGVmdDogMCxcbiAgdG9wOiAwLFxuICBvcGFjaXR5OiAwLFxuICBzY2FsZTogMSxcbiAgZXF1aXZhbFNjYWxlOiAxXG59O1xuZnVuY3Rpb24gdXBkYXRlUG9zaXRpb24obGVmdCwgdG9wKSB7XG4gIHN0YXRlLmxlZnQgPSBsZWZ0O1xuICBzdGF0ZS50b3AgPSB0b3A7XG4gIHNlbmRSdW50aW1lTWVzc2FnZSgnc2V0T3ZlcmxheUNhcHR1cmUnLCBbY3VycmVudFRhYklkLCBzdGF0ZV0pO1xufVxuZnVuY3Rpb24gYnVpbGRJbWFnZSgpIHtcbiAgaWYgKGNvdmVySW1hZ2UpIHtcbiAgICByZXR1cm4gY292ZXJJbWFnZTtcbiAgfVxuICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgaW1nLnN0eWxlLmNzc1RleHQgPSBgXG4gICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgei1pbmRleDogOTk5OTk5OTk7XG4gICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IGxlZnQgdG9wO1xuICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgICAgb3BhY2l0eTogLjM7XG4gICAgYDtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpbWcpO1xuICBiaW5kRXZlbnQoaW1nKTtcbiAgY292ZXJJbWFnZSA9IGltZztcbiAgcmV0dXJuIGNvdmVySW1hZ2U7XG59XG5mdW5jdGlvbiB1cGRhdGVTdHlsZSgpIHtcbiAgY29uc3QgY292ZXIgPSBjb3ZlckltYWdlO1xuICBpZiAoIWNvdmVyKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIGNvbnNvbGUubG9nKCdzdGF0ZScsIHN0YXRlKTtcbiAgY292ZXIuc3R5bGUub3BhY2l0eSA9IFN0cmluZyhzdGF0ZS5vcGFjaXR5ID8/IDAuNSk7XG4gIGNvdmVyLnN0eWxlLnRyYW5zZm9ybSA9IGBzY2FsZSgke3N0YXRlLnNjYWxlIC8gc3RhdGUuZXF1aXZhbFNjYWxlfSlgO1xuICBjb3Zlci5zdHlsZS5sZWZ0ID0gYCR7c3RhdGUubGVmdCAvIHN0YXRlLmVxdWl2YWxTY2FsZX1weGA7XG4gIGNvdmVyLnN0eWxlLnRvcCA9IGAke3N0YXRlLnRvcCAvIHN0YXRlLmVxdWl2YWxTY2FsZX1weGA7XG4gIGNvdmVyLnNyYyA9IHN0YXRlLmJhc2U2NDtcbn1cbmZ1bmN0aW9uIHVwZGF0ZUNvdmVySW1hZ2UoZGF0YSkge1xuICBjb25zdCB7XG4gICAgYmFzZTY0LFxuICAgIGVuYWJsZSxcbiAgICBvcGFjaXR5LFxuICAgIHNjYWxlLFxuICAgIGxlZnQsXG4gICAgdG9wXG4gIH0gPSBkYXRhID8/IHtcbiAgICBlbmFibGU6IGZhbHNlXG4gIH07XG4gIE9iamVjdC5hc3NpZ24oc3RhdGUsIGRhdGEpO1xuICBpZiAoIWNvdmVySW1hZ2UgJiYgIWVuYWJsZSkge1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBjb3ZlciA9IGJ1aWxkSW1hZ2UoKTtcbiAgLy8gY292ZXIuc3R5bGUucG9pbnRlckV2ZW50cyA9IGVuYWJsZSA/ICcnIDogJ25vbmUnO1xuICBjb3Zlci5zdHlsZS5kaXNwbGF5ID0gZW5hYmxlID8gJ2Jsb2NrJyA6ICdub25lJztcbiAgaWYgKCFlbmFibGUpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdXBkYXRlU3R5bGUoKTtcbn1cbmZ1bmN0aW9uIGJpbmRFdmVudChub2RlKSB7XG4gIGJpbmREcmFnZ2VyKG5vZGUsICgpID0+IG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCwgKCkgPT4gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AsIChsLCB0KSA9PiB7XG4gICAgdXBkYXRlUG9zaXRpb24obCwgdCk7XG4gICAgdXBkYXRlU3R5bGUoKTtcbiAgfSk7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZSA9PiB7XG4gICAgY29uc3Qgb2Zmc2V0ID0gZS5hbHRLZXkgPyAxMCA6IDE7XG4gICAgc3dpdGNoIChlLmtleSkge1xuICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgc3RhdGUudG9wICs9IG9mZnNldDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHN0YXRlLnRvcCAtPSBvZmZzZXQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnQXJyb3dSaWdodCc6XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgc3RhdGUubGVmdCArPSBvZmZzZXQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBzdGF0ZS5sZWZ0IC09IG9mZnNldDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiJ1wiOlxuICAgICAgICBzdGF0ZS5lbmFibGUgPSAhc3RhdGUuZW5hYmxlO1xuICAgICAgICB1cGRhdGVDb3ZlckltYWdlKHN0YXRlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHVwZGF0ZVBvc2l0aW9uKHN0YXRlLmxlZnQsIHN0YXRlLnRvcCk7XG4gICAgdXBkYXRlU3R5bGUoKTtcbiAgfSk7XG59XG5hc3luYyBmdW5jdGlvbiBydW4odGFiSWQpIHtcbiAgY3VycmVudFRhYklkID0gdGFiSWQ7XG4gIHNlbmRSdW50aW1lTWVzc2FnZSgnZ2V0T3ZlcmxheUNhcHR1cmUnLCBbdGFiSWRdLCBkYXRhID0+IHtcbiAgICAvLyBjb25zdCB7IGJhc2U2NCwgZW5hYmxlIH0gPSBkYXRhID8/IHt9O1xuICAgIC8vIGNvbnNvbGUubG9nKCdzdHJlYW1JZCcsIGJhc2U2ND8ubGVuZ3RoLCBlbmFibGUpO1xuICAgIHVwZGF0ZUNvdmVySW1hZ2UoZGF0YSk7XG4gIH0pO1xufVxuc2VuZFJ1bnRpbWVNZXNzYWdlKCd0YWJJbmZvJywgW10sIHRhYklkID0+IHtcbiAgcnVuKHRhYklkKTtcbn0pO1xub25SdW50aW1lTWVzc2FnZSgndXBkYXRlT3ZlcmxheUNhcHR1cmUnLCBfcmVmID0+IHtcbiAgbGV0IFtkYXRhXSA9IF9yZWY7XG4gIC8vIGNvbnN0IHsgYmFzZTY0LCBlbmFibGUgfSA9IGRhdGEgPz8ge307XG4gIC8vIGNvbnNvbGUubG9nKCd1cGRhdGVPdmVybGF5Q2FwdHVyZScsIGJhc2U2ND8ubGVuZ3RoLCBlbmFibGUpO1xuICB1cGRhdGVDb3ZlckltYWdlKGRhdGEpO1xufSk7IiwiaW1wb3J0IHsgZXZhbFNjcmlwdCwgc2VuZFJ1bnRpbWVNZXNzYWdlIH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xuaW1wb3J0IHsgc2NyaXB0UnVsZXMgfSBmcm9tICcuL3NjcmlwdFJ1bGUnO1xuYXN5bmMgZnVuY3Rpb24gcnVuKHRhYklkKSB7XG4gIGNvbnN0IHtcbiAgICBob3N0bmFtZTogZG9tYWluLFxuICAgIHBvcnQsXG4gICAgcGF0aG5hbWU6IHBhdGgsXG4gICAgc2VhcmNoOiBxdWVyeSxcbiAgICBoYXNoXG4gIH0gPSBsb2NhdGlvbjtcbiAgbGV0IHJ1bGUgPSBhd2FpdCBzY3JpcHRSdWxlcy5tYXRjaChgJHtkb21haW59JHtwb3J0ID8gYDoke3BvcnR9YCA6ICcnfSR7cGF0aH0ke3F1ZXJ5fSR7aGFzaH1gKTtcbiAgaWYgKCFydWxlPy5lbmFibGUpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gY29uc3QgdGFiID0gYXdhaXQgZ2V0Q3VycmVudFRhYigpO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xuICAgIHJ1bGUuc3R5bGVzICYmIGluc2VydFN0eWxlcyhydWxlLnN0eWxlcyk7XG4gIH0pO1xuICAvLyBydWxlIS5zY3JpcHRzICYmIHNlbmRSdW50aW1lTWVzc2FnZSgnZXhlY1NjcmlwdCcsIFtydWxlIS5zY3JpcHRzXSk7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgYXN5bmMgZnVuY3Rpb24gZXZhbENvbnRlbnRTY3JpcHQoKSB7XG4gICAgLy8gcnVsZSEuc2NyaXB0cyAmJiBjaHJvbWUuc2NyaXB0aW5nLmV4ZWN1dGVTY3JpcHQoeyBmdW5jOiAoKSA9PiBldmFsKHJ1bGUhLnNjcmlwdHMpIH0pO1xuICAgIC8vIHJ1bGUhLnNjcmlwdHMgJiYgc2VuZFJ1bnRpbWVNZXNzYWdlKCdleGVjU2NyaXB0JywgW3J1bGUhLnNjcmlwdHNdKTtcbiAgICBydWxlLnNjcmlwdHMgJiYgZXZhbFNjcmlwdChydWxlLnNjcmlwdHMpO1xuICAgIC8vIGluc2VydFNjcmlwdChydWxlIS5zY3JpcHRzKTtcbiAgfSwge1xuICAgIG9uY2U6IHRydWVcbiAgfSk7XG59XG5zZW5kUnVudGltZU1lc3NhZ2UoJ3RhYkluZm8nLCBbXSwgdGFiSWQgPT4ge1xuICBydW4odGFiSWQpO1xufSk7XG5mdW5jdGlvbiBpbnNlcnRTdHlsZXMoc3R5bGVzKSB7XG4gIC8vIFRPRE8g5L2/55Soc3R5bGVzaGVldHPmt7vliqBcbiAgY29uc3Qgc3R5bGVUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICBzdHlsZVRhZy5kYXRhc2V0Lmluc2VydFN0eWxlcyA9ICcxJztcbiAgc3R5bGVUYWcuaW5uZXJIVE1MID0gc3R5bGVzO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHN0eWxlVGFnKTtcbn1cbmZ1bmN0aW9uIGluc2VydFNjcmlwdChjb2RlKSB7XG4gIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgZWxlbS50ZXh0Q29udGVudCA9IGNvZGU7XG4gIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoZWxlbSk7XG59IiwiaW1wb3J0IHsgZ2V0TG9jYWxTdG9yYWdlLCByZWdpc3RlclN0b3JhZ2UsIHNldExvY2FsU3RvcmFnZSB9IGZyb20gJy4uLy4uL3V0aWxzJztcbmNvbnN0IHN0b3JhZ2VLZXkgPSAnc2NyaXB0UnVsZXMnO1xuY2xhc3MgU2NyaXB0UnVsZSB7XG4gIHNhdmVUeXBlID0gJ2xvY2FsJztcbiAgdG9QcmVnKHJ1bGVOYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoU3RyaW5nLnJhd2BeJHtydWxlTmFtZX1gKTtcbiAgfVxuICBhc3luYyBnZXRBbGxSdWxlcygpIHtcbiAgICByZXR1cm4gZ2V0TG9jYWxTdG9yYWdlKHN0b3JhZ2VLZXksIHt9KTtcbiAgICAvLyByZXR1cm4gbmV3IFByb21pc2UoKHJlcykgPT4ge1xuICAgIC8vICAgICBjaHJvbWUuc3RvcmFnZVt0aGlzLnNhdmVUeXBlXS5nZXQoJ3NjcmlwdFJ1bGVzJywgKHJzKSA9PiByZXMocnM/LnNjcmlwdFJ1bGVzID8/IHt9KSk7XG4gICAgLy8gfSk7XG4gIH1cblxuICBhc3luYyBzZXRBbGxSdWxlcyhydWxlcykge1xuICAgIHNldExvY2FsU3RvcmFnZShzdG9yYWdlS2V5LCBydWxlcyk7XG4gICAgLy8gY2hyb21lLnN0b3JhZ2VbdGhpcy5zYXZlVHlwZV0uc2V0KHtcbiAgICAvLyAgICAgc2NyaXB0UnVsZXM6IHJ1bGVzLFxuICAgIC8vIH0pO1xuICB9XG5cbiAgYXN5bmMgc2V0KHJ1bGVOYW1lLCBfcmVmKSB7XG4gICAgbGV0IHtcbiAgICAgIHN0eWxlcyxcbiAgICAgIHNjcmlwdHMsXG4gICAgICBlbmFibGUgPSB0cnVlXG4gICAgfSA9IF9yZWY7XG4gICAgaWYgKCFydWxlTmFtZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgcnVsZXMgPSBhd2FpdCB0aGlzLmdldEFsbFJ1bGVzKCk7XG4gICAgcnVsZXNbcnVsZU5hbWVdID0ge1xuICAgICAgZW5hYmxlLFxuICAgICAgc3R5bGVzLFxuICAgICAgc2NyaXB0cyxcbiAgICAgIG5hbWU6IHJ1bGVOYW1lXG4gICAgfTtcbiAgICBzZXRMb2NhbFN0b3JhZ2Uoc3RvcmFnZUtleSwgcnVsZXMpO1xuICAgIC8vIGNocm9tZS5zdG9yYWdlW3RoaXMuc2F2ZVR5cGVdLnNldCh7IHNjcmlwdFJ1bGVzOiBydWxlcyB9KTtcbiAgfVxuXG4gIGFzeW5jIGdldChydWxlTmFtZSkge1xuICAgIGxldCBydWxlcyA9IGF3YWl0IHRoaXMuZ2V0QWxsUnVsZXMoKTtcbiAgICByZXR1cm4gcnVsZXNbcnVsZU5hbWVdO1xuICB9XG4gIGFzeW5jIHJlbW92ZShydWxlTmFtZSkge1xuICAgIGxldCBydWxlcyA9IGF3YWl0IHRoaXMuZ2V0QWxsUnVsZXMoKTtcbiAgICBkZWxldGUgcnVsZXNbcnVsZU5hbWVdO1xuICAgIHNldExvY2FsU3RvcmFnZShzdG9yYWdlS2V5LCBydWxlcyk7XG4gICAgLy8gY2hyb21lLnN0b3JhZ2VbdGhpcy5zYXZlVHlwZV0uc2V0KHsgc2NyaXB0UnVsZXM6IHJ1bGVzIH0pO1xuICB9XG5cbiAgYXN5bmMgbWF0Y2godXJsKSB7XG4gICAgbGV0IHJ1bGVzID0gYXdhaXQgdGhpcy5nZXRBbGxSdWxlcygpO1xuICAgIGxldCBydWxlTGlzdCA9IE9iamVjdC5rZXlzKHJ1bGVzKTtcbiAgICBsZXQgbWF0Y2ggPSBudWxsO1xuICAgIHJ1bGVMaXN0LmZvckVhY2gocnVsZU5hbWUgPT4ge1xuICAgICAgbGV0IHJ1bGUgPSBydWxlc1tydWxlTmFtZV07XG4gICAgICAvLyDljLnphY3ogIzkuJTmr5TkuYvliY1tYXRjaOeahOabtOmVv1xuICAgICAgaWYgKHRoaXMudG9QcmVnKHJ1bGUubmFtZSkudGVzdCh1cmwpICYmICghbWF0Y2ggfHwgcnVsZS5uYW1lLmxlbmd0aCA+IHJ1bGVzW21hdGNoXS5uYW1lLmxlbmd0aCkpIHtcbiAgICAgICAgbWF0Y2ggPSBydWxlTmFtZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcnVsZXNbbWF0Y2hdO1xuICB9XG59XG5leHBvcnQgY29uc3Qgc2NyaXB0UnVsZXMgPSBuZXcgU2NyaXB0UnVsZSgpO1xucmVnaXN0ZXJTdG9yYWdlKHN0b3JhZ2VLZXksIHtcbiAgb25FeHBvcnQ6IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgZ2V0TG9jYWxTdG9yYWdlKHN0b3JhZ2VLZXksIHt9KTtcbiAgICByZXR1cm4gZGF0YTtcbiAgfSxcbiAgb25JbXBvcnQ6IGFzeW5jIGRhdGEgPT4ge1xuICAgIGF3YWl0IHNldExvY2FsU3RvcmFnZShzdG9yYWdlS2V5LCBkYXRhKTtcbiAgfVxufSk7IiwiaW1wb3J0IHsgJCB9IGZyb20gJy4vdG9vbHMnO1xuLy8gdGFicyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFNlbGVjdGVkKCkge1xuICByZXR1cm4gbmV3IFByb21pc2UocmVzID0+IHtcbiAgICAvLyBjaHJvbWUudGFicy5nZXRTZWxlY3RlZChmdW5jdGlvbiAodGFiKSB7XG4gICAgLy8gICAgIHJlcyh0YWIpO1xuICAgIC8vIH0pO1xuICAgIGNocm9tZS50YWJzLnF1ZXJ5KHtcbiAgICAgIGN1cnJlbnRXaW5kb3c6IHRydWUsXG4gICAgICBhY3RpdmU6IHRydWVcbiAgICB9LCBmdW5jdGlvbiAodGFicykge1xuICAgICAgcmVzKHRhYnNbMF0pO1xuICAgIH0pO1xuICB9KTtcbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDdXJyZW50VGFiKCkge1xuICAvLyByZXR1cm4gY2hyb21lLnRhYnMuZ2V0Q3VycmVudCgpO1xuICByZXR1cm4gbmV3IFByb21pc2UocmVzID0+IHtcbiAgICAvLyBjaHJvbWUudGFicy5nZXRTZWxlY3RlZChmdW5jdGlvbiAodGFiKSB7XG4gICAgLy8gICAgIHJlcyh0YWIpO1xuICAgIC8vIH0pO1xuICAgIGNocm9tZS50YWJzLnF1ZXJ5KHtcbiAgICAgIGN1cnJlbnRXaW5kb3c6IHRydWUsXG4gICAgICBhY3RpdmU6IHRydWVcbiAgICB9LCBmdW5jdGlvbiAodGFicykge1xuICAgICAgcmVzKHRhYnNbMF0pO1xuICAgIH0pO1xuICB9KTtcbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRUYWIodGFiSWQpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuICAgIGNocm9tZS50YWJzLmdldCh0YWJJZCwgdGFiID0+IHtcbiAgICAgIHJlcyh0YWIpO1xuICAgIH0pO1xuICB9KTtcbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBbGxUYWJzKCkge1xuICByZXR1cm4gbmV3IFByb21pc2UocmVzID0+IHtcbiAgICBjaHJvbWUudGFicy5xdWVyeSh7fSwgdGFicyA9PiB7XG4gICAgICByZXModGFicyk7XG4gICAgfSk7XG4gIH0pO1xufVxuLy8gbWVzc2FnZSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gZXhwb3J0IGZ1bmN0aW9uIHNlbmRUb0NvbnRlbnQobWVzc2FnZTogc3RyaW5nLCBjYWxsYmFjazogQ29tbW9uQ2FsbGJhY2spIHtcbi8vICAgICBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZSB9LCBmdW5jdGlvbiAodGFicykge1xuLy8gICAgICAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZSh0YWJzWzBdIS5pZCEsIG1lc3NhZ2UsIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuLy8gICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjayhyZXNwb25zZSk7XG4vLyAgICAgICAgIH0pO1xuLy8gICAgIH0pO1xuLy8gfVxuLy8gZXhwb3J0IGZ1bmN0aW9uIGNvbnRlbnRPbk1lc3NhZ2UoY2FsbGJhY2s6IENvbW1vbkNhbGxiYWNrKSB7XG4vLyAgICAgY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGZ1bmN0aW9uIChyZXF1ZXN0LCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xuLy8gICAgICAgICBpZiAoc2VuZGVyLnRhYikge1xuLy8gICAgICAgICAgICAgcmV0dXJuO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKHJlcXVlc3QpO1xuLy8gICAgIH0pO1xuLy8gfVxuLy8gcG9wdXAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmV4cG9ydCBjb25zdCBwb3B1cE1heFdpZHRoID0gNTAwO1xuZXhwb3J0IGNvbnN0IHBvcHVwTWF4SGVpZ2h0ID0gNjAwO1xuZXhwb3J0IGNvbnN0IHBvcHVwTWluV2lkdGggPSAyMDA7XG5leHBvcnQgZnVuY3Rpb24gc2V0Qm9keVNpemUobWF4V2lkdGgsIG1heEhlaWdodCkge1xuICAkKCcjbWFpbicpLnN0eWxlLndpZHRoID0gYCR7bWF4V2lkdGggPyBwb3B1cE1heFdpZHRoIDogcG9wdXBNaW5XaWR0aH1weGA7XG4gIGlmICh0eXBlb2YgbWF4SGVpZ2h0ID09PSAnYm9vbGVhbicpIHtcbiAgICAkKCcjbWFpbicpLnN0eWxlLmhlaWdodCA9IG1heEhlaWdodCA/IGAke3BvcHVwTWF4SGVpZ2h0fXB4YCA6ICcnO1xuICB9XG59XG4vLyBlbnYgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmV4cG9ydCB2YXIgRXhlY0VudjtcbihmdW5jdGlvbiAoRXhlY0Vudikge1xuICBFeGVjRW52W0V4ZWNFbnZbXCJCYWNrZ3JvdW5kXCJdID0gMF0gPSBcIkJhY2tncm91bmRcIjtcbiAgRXhlY0VudltFeGVjRW52W1wiUG9wdXBcIl0gPSAxXSA9IFwiUG9wdXBcIjtcbiAgRXhlY0VudltFeGVjRW52W1wiQ29udGVudFwiXSA9IDJdID0gXCJDb250ZW50XCI7XG59KShFeGVjRW52IHx8IChFeGVjRW52ID0ge30pKTtcbmZ1bmN0aW9uIGdldEN1cnJlbnRFbnYoKSB7XG4gIGlmICghY2hyb21lLmV4dGVuc2lvbi5nZXRCYWNrZ3JvdW5kUGFnZSkge1xuICAgIHJldHVybiBFeGVjRW52LkNvbnRlbnQ7XG4gIH1cbiAgaWYgKGNocm9tZS5leHRlbnNpb24uZ2V0QmFja2dyb3VuZFBhZ2UoKSA9PT0gd2luZG93KSB7XG4gICAgcmV0dXJuIEV4ZWNFbnYuQmFja2dyb3VuZDtcbiAgfVxuICByZXR1cm4gRXhlY0Vudi5Qb3B1cDtcbn1cbmV4cG9ydCBjb25zdCBjdXJyZW50RW52ID0gZ2V0Q3VycmVudEVudigpO1xuZXhwb3J0IGZ1bmN0aW9uIGV2YWxTY3JpcHRJblRhYih0YWJJZCwgc2NyaXB0KSB7XG4gIGxldCB2YXJPYmogPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IHt9O1xuICBjb25zdCB2YXJOYW1lcyA9IFtdO1xuICBjb25zdCB2YXJEYXRhID0gW107XG4gIE9iamVjdC5lbnRyaWVzKHZhck9iaikuZm9yRWFjaChfcmVmID0+IHtcbiAgICBsZXQgW25hbWUsIGRhdGFdID0gX3JlZjtcbiAgICB2YXJOYW1lcy5wdXNoKG5hbWUpO1xuICAgIHZhckRhdGEucHVzaChkYXRhKTtcbiAgfSk7XG4gIGNocm9tZS5zY3JpcHRpbmcuZXhlY3V0ZVNjcmlwdCh7XG4gICAgdGFyZ2V0OiB7XG4gICAgICB0YWJJZFxuICAgIH0sXG4gICAgYXJnczogW3NjcmlwdCwgdmFyTmFtZXMsIHZhckRhdGFdLFxuICAgIGZ1bmM6IGZ1bmN0aW9uIChzY3JpcHQpIHtcbiAgICAgIGxldCB2YXJOYW1lcyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogW107XG4gICAgICBsZXQgdmFyRGF0YSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogW107XG4gICAgICBjb25zb2xlLmxvZygnZWVlZT09PT09Jywgc2NyaXB0LCB2YXJOYW1lcywgdmFyRGF0YSk7XG4gICAgICByZXR1cm4gRnVuY3Rpb24oLi4udmFyTmFtZXMsIGBcInVzZSBzdHJpY3RcIjske3NjcmlwdH1gKSguLi52YXJEYXRhKTtcbiAgICB9XG4gIH0pO1xufSIsImV4cG9ydCBmdW5jdGlvbiBiaW5kRHJhZ2dlcihub2RlLCBzdGFydFhHZXR0ZXIsIHN0YXJ0WUdldHRlciwgb25VcGRhdGUpIHtcbiAgbGV0IGRyYWdnaW5nID0gZmFsc2U7XG4gIGxldCBzdGFydFggPSAwO1xuICBsZXQgc3RhcnRZID0gMDtcbiAgbGV0IG9mZnNldFggPSAwO1xuICBsZXQgb2Zmc2V0WSA9IDA7XG4gIG5vZGUuZHJhZ2dhYmxlID0gZmFsc2U7XG4gIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZSA9PiB7XG4gICAgaWYgKCFub2RlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWdnaW5nID0gdHJ1ZTtcbiAgICBzdGFydFggPSBzdGFydFhHZXR0ZXIoKTtcbiAgICBzdGFydFkgPSBzdGFydFlHZXR0ZXIoKTtcbiAgICBvZmZzZXRYID0gZS5wYWdlWDtcbiAgICBvZmZzZXRZID0gZS5wYWdlWTtcbiAgfSk7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBlID0+IHtcbiAgICBpZiAoIW5vZGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFkcmFnZ2luZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBvblVwZGF0ZShlLnBhZ2VYIC0gb2Zmc2V0WCArIHN0YXJ0WCwgZS5wYWdlWSAtIG9mZnNldFkgKyBzdGFydFkpO1xuICB9KTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBlID0+IHtcbiAgICBpZiAoIW5vZGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFkcmFnZ2luZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFnZ2luZyA9IGZhbHNlO1xuICB9KTtcbn0iLCJleHBvcnQgKiBmcm9tICcuL21lc3NhZ2UnO1xuZXhwb3J0ICogZnJvbSAnLi9kcmFnZ2VyJztcbmV4cG9ydCAqIGZyb20gJy4vc3RvcmFnZSc7XG5leHBvcnQgKiBmcm9tICcuL2Nocm9tZSc7XG5leHBvcnQgKiBmcm9tICcuL3Rvb2xzJztcbi8vIGVkaXRvciDljZXni6zlvJUiLCJleHBvcnQgZnVuY3Rpb24gb25SdW50aW1lTWVzc2FnZShjaGFubmVsLCBjYWxsYmFjaykge1xuICBjaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKHJlcXVlc3QsIHNlbmRlciwgcmVzcG9uc2UpIHtcbiAgICBpZiAocmVxdWVzdC5jaGFubmVsICE9PSBjaGFubmVsKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjYWxsYmFjayhyZXF1ZXN0LmRhdGEsIHNlbmRlciwgcmVzcG9uc2UpO1xuICAgIH0sIDEpO1xuICAgIHJldHVybiB0cnVlO1xuICB9KTtcbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZW5kUnVudGltZU1lc3NhZ2UoY2hhbm5lbCwgZGF0YSwgb25SZXNwb25zZSkge1xuICByZXR1cm4gbmV3IFByb21pc2UocmVzID0+IHtcbiAgICBpZiAob25SZXNwb25zZSkge1xuICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuICAgICAgICBjaGFubmVsLFxuICAgICAgICBkYXRhXG4gICAgICB9LCBkYXRhID0+IHtcbiAgICAgICAgb25SZXNwb25zZShkYXRhKTtcbiAgICAgICAgcmVzKGRhdGEpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICAgICAgY2hhbm5lbCxcbiAgICAgICAgZGF0YVxuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzZW5kVGFiTWVzc2FnZShjaGFubmVsLCB0YWJJZCwgZGF0YSkge1xuICByZXR1cm4gY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UodGFiSWQsIHtcbiAgICBjaGFubmVsLFxuICAgIGRhdGFcbiAgfSk7XG59IiwiaW1wb3J0IHsgY3VycmVudEVudiwgRXhlY0VudiB9IGZyb20gJy4vY2hyb21lJztcbi8vIHN0b3JhZ2UgPT09PT09PT09PT09PVxuZXhwb3J0IGZ1bmN0aW9uIGdldExvY2FsU3RvcmFnZShuYW1lLCBkZWZhdWx0VmFsdWUpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKHJlcyA9PiB7XG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KG5hbWUsIHJzID0+IHJlcyhycz8uW25hbWVdID8/IGRlZmF1bHRWYWx1ZSkpO1xuICB9KTtcbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZXRMb2NhbFN0b3JhZ2UobmFtZSwgdmFsdWUpIHtcbiAgYXdhaXQgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHtcbiAgICBbbmFtZV06IHZhbHVlXG4gIH0pO1xufVxuY29uc3Qgc3RvcmFnZUhhbmRsZXJTdG9yZSA9IG5ldyBNYXAoKTtcbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlclN0b3JhZ2Uoa2V5LCBoYW5kbGVyKSB7XG4gIHN0b3JhZ2VIYW5kbGVyU3RvcmUuc2V0KGtleSwgaGFuZGxlcik7XG4gIGlmIChjdXJyZW50RW52ICE9PSBFeGVjRW52LkNvbnRlbnQpIHtcbiAgICBjb25zb2xlLmxvZyhgW3N0b3JhZ2VdIHJlZ2lzdGVyIG1vZHVsZTogJHtrZXl9YCk7XG4gIH1cbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTdG9yYWdlRXhwb3J0RGF0YSgpIHtcbiAgY29uc3QgZGF0YSA9IHt9O1xuICBmb3IgKGxldCBba2V5LCBoYW5kbGVyXSBvZiBzdG9yYWdlSGFuZGxlclN0b3JlKSB7XG4gICAgaWYgKGhhbmRsZXIpIHtcbiAgICAgIGRhdGFba2V5XSA9IGF3YWl0IGhhbmRsZXIub25FeHBvcnQoKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGRhdGEsIG51bGwsIDQpO1xufVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNldFN0b3JhZ2VJbXBvcnREYXRhKGRhdGEpIHtcbiAgY29uc3QgZGF0YU9iamVjdCA9IEpTT04ucGFyc2UoZGF0YSk7XG4gIGZvciAobGV0IFtrZXksIGhhbmRsZXJdIG9mIHN0b3JhZ2VIYW5kbGVyU3RvcmUpIHtcbiAgICBjb25zdCBpbXBvcnREYXRhID0gZGF0YU9iamVjdFtrZXldO1xuICAgIGlmIChpbXBvcnREYXRhKSB7XG4gICAgICBhd2FpdCBoYW5kbGVyPy5vbkltcG9ydChpbXBvcnREYXRhKTtcbiAgICB9XG4gIH1cbn0iLCJleHBvcnQgZnVuY3Rpb24gZXZhbFNjcmlwdChzY3JpcHQpIHtcbiAgbGV0IHZhck9iaiA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gIGNvbnN0IHZhck5hbWVzID0gW107XG4gIGNvbnN0IHZhckRhdGEgPSBbXTtcbiAgT2JqZWN0LmVudHJpZXModmFyT2JqKS5mb3JFYWNoKF9yZWYgPT4ge1xuICAgIGxldCBbbmFtZSwgZGF0YV0gPSBfcmVmO1xuICAgIHZhck5hbWVzLnB1c2gobmFtZSk7XG4gICAgdmFyRGF0YS5wdXNoKGRhdGEpO1xuICB9KTtcbiAgcmV0dXJuIG5ldyBGdW5jdGlvbiguLi52YXJOYW1lcywgYFwidXNlIHN0cmljdFwiOyR7c2NyaXB0fWApKC4uLnZhckRhdGEpO1xufVxuZXhwb3J0IGZ1bmN0aW9uICQoc2VsZWN0b3IpIHtcbiAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGRlYm91bmNlKGZuKSB7XG4gIGxldCBkZWxheSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogMzAwO1xuICBsZXQgdGltZXIgPSB1bmRlZmluZWQ7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cbiAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiBmbiguLi5hcmdzKSwgZGVsYXkpO1xuICB9O1xufVxuZXhwb3J0IGZ1bmN0aW9uIHNsZWVwKCkge1xuICBsZXQgbiA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogMDtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKHJlcyA9PiB7XG4gICAgc2V0VGltZW91dChyZXMsIG4pO1xuICB9KTtcbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkSW1hZ2Uoc3JjKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgcmVzKGltZyk7XG4gICAgfTtcbiAgICBpbWcub25lcnJvciA9IHJlajtcbiAgICBpbWcuc3JjID0gc3JjO1xuICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBhcnJheUdyb3VwQnkoYXJyYXksIGNvbmRpdGlvbikge1xuICBjb25zdCBtYXAgPSBuZXcgTWFwKCk7XG4gIGFycmF5LmZvckVhY2goaXRlbSA9PiB7XG4gICAgY29uc3QgdmFsdWUgPSBjb25kaXRpb24oaXRlbSk7XG4gICAgaWYgKCFtYXAuaGFzKHZhbHVlKSkge1xuICAgICAgbWFwLnNldCh2YWx1ZSwgW10pO1xuICAgIH1cbiAgICBtYXAuZ2V0KHZhbHVlKS5wdXNoKGl0ZW0pO1xuICB9KTtcbiAgcmV0dXJuIFsuLi5tYXAudmFsdWVzKCldO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGluc2VydFRlbXBsYXRlKHRlbXBsYXRlKSB7XG4gIHJldHVybiAkKCcjbWFpbicpLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgdGVtcGxhdGUpO1xufVxuLy8gZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvYWRTY3JpcHQoc3JjOiBzdHJpbmcpIHtcbi8vICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG4vLyAgICAgICAgIGNvbnN0IHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbi8vICAgICAgICAgcy5zcmMgPSBzcmM7XG4vLyAgICAgICAgIHMub25sb2FkID0gcmVzO1xuLy8gICAgICAgICBzLm9uZXJyb3IgPSByZWo7XG4vLyAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocyk7XG4vLyAgICAgfSk7XG4vLyB9XG5leHBvcnQgZnVuY3Rpb24gZG93bmxvYWQoZmlsZU5hbWUsIHVybCkge1xuICBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICBhLmhyZWYgPSB1cmw7XG4gIGEuZG93bmxvYWQgPSBmaWxlTmFtZTtcbiAgYS5jbGljaygpO1xufVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlYWRGaWxlKGZpbGUpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuICAgIGNvbnN0IGZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIGZpbGVSZWFkZXIucmVhZEFzVGV4dChmaWxlKTtcbiAgICBmaWxlUmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IGZpbGVDb250ZW50ID0gZmlsZVJlYWRlci5yZXN1bHQ7XG4gICAgICByZXMoZmlsZUNvbnRlbnQpO1xuICAgIH07XG4gICAgZmlsZVJlYWRlci5vbmVycm9yID0gcmVqO1xuICB9KTtcbn1cbmZ1bmN0aW9uIHRvUHJlZyh1cmxQYXR0ZXJuKSB7XG4gIC8vIOi/memHjOacieS6m+eJueauiuWtl+espuWPr+iDvemcgOimgeWkhOeQhu+8jOS+i+Wmgj/kuYvnsbvnmoRcbiAgcmV0dXJuIG5ldyBSZWdFeHAoU3RyaW5nLnJhd2BeJHt1cmxQYXR0ZXJufWAucmVwbGFjZSgvKFtcXD9dKS9nLCAnXFxcXCQxJykpO1xufVxuLyoqXG4gKiB1cmwg6YCa6YWN56ym5Yy56YWN5L2/55SoXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXRjaFVybCh1cmwsIHBhdHRlcm4pIHtcbiAgcmV0dXJuIHRvUHJlZyhwYXR0ZXJuKS50ZXN0KHVybCk7XG59XG5leHBvcnQgZnVuY3Rpb24gbWF0Y2hVcmxQYXR0ZXJuKHVybCwgaXRlbUxpc3QsIGdldFVybCkge1xuICBsZXQgbWF0Y2ggPSB1bmRlZmluZWQ7XG4gIGl0ZW1MaXN0Lm1hcChpdGVtID0+IGdldFVybChpdGVtKSkuZm9yRWFjaCgodXJsUGF0dGVybiwgaW5kZXgpID0+IHtcbiAgICAvLyDljLnphY3ogIzkuJTmr5TkuYvliY1tYXRjaOeahOabtOmVv1xuICAgIGlmIChtYXRjaFVybCh1cmwsIHVybFBhdHRlcm4pICYmICghbWF0Y2ggfHwgdXJsUGF0dGVybi5sZW5ndGggPiBnZXRVcmwobWF0Y2gpLmxlbmd0aCkpIHtcbiAgICAgIG1hdGNoID0gaXRlbUxpc3RbaW5kZXhdO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBtYXRjaDtcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbl9fd2VicGFja19yZXF1aXJlX18oXCIuLi8uLi8uLi8uY29uZmlnL3lhcm4vZ2xvYmFsL25vZGVfbW9kdWxlcy9yZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanNcIik7XG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9jb250ZW50L2luZGV4LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9