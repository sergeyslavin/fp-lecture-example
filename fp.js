const pipe = (...fns) => initialArg => fns.reduce((result, fn) => fn(result), initialArg);

const curry = (originalFunction, initialParams = []) => {
    return (...nextParams) => {
        const curriedFunction = (params) => {
            if (params.length === originalFunction.length) {
                return originalFunction(...params);
            }
            return curry(originalFunction, params);
        };
        return curriedFunction([...initialParams, ...nextParams]);
    };
};

const map = curry((fn, items) => items.map(i => fn(i)));

const reduce = curry((fn, initialValue, items) => items.reduce(fn, initialValue));

// const prop = name => obj => obj[name];
const prop = curry((propName, obj) => obj[propName]);

// const filter = list => predicate => list.filter(predicate);
const filter = curry((predicate, list) => list.filter(predicate));

const find = curry((predicate, list) => list.find(predicate));

const findIndex = curry((predicate, list) => list.findIndex(predicate));

// isEq = a => b => a === b;
const isEq = curry((a, b) => a === b);

// const = item => list => [...list, item];
const concat = curry((item, list) => [...list, item]);

// const not = cond => !cond
const not = curry(cond => !cond);

// const tap = fn => el => fn(el) && el;
const tap = curry((fn, el) => {
    fn(el);
    return el;
});

const multiply = curry((a, b) => a * b);

const copyObject = curry(object => JSON.parse(JSON.stringify(object)));

const update = curry((index, newVal, list) => {
    return pipe(
        copyObject,
        curry(listCopy => {
            listCopy[index] = Object.assign({}, listCopy[index], newVal);
            return listCopy;
        }),
    )(list);
});

module.exports = {
    curry,
    pipe,
    prop,
    filter,
    isEq,
    tap,
    concat,
    not,
    map,
    reduce,
    multiply,
    find,
    copyObject,
    findIndex,
    update
};