const pubSub = (function () {
  const topics = {};
  const hOP = topics.hasOwnProperty;

  return {
    subscribe(topic, listener) {
      if (!hOP.call(topics, topic)) topics[topic] = [];
      const index = topics[topic].push(listener) - 1;
      return {
        remove() {
          delete topics[topic][index];
        },
      };
    },
    publish(topic, info) {
      if (!hOP.call(topics, topic)) return;
      topics[topic].forEach((item) => {
        item(info !== undefined ? info : {});
      });
    },
  };
})();

export default pubSub;
