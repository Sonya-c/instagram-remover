const getPostCount = () =>
  document
    .querySelector('[data-testid="liked_container_non_empty_state"]')
    .getElementsByTagName("img").length;

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const remove = async (i) => {
  console.log("[remove-liked-post] Openining post");
  document
    .getElementsByTagName("article")[0]
    .getElementsByTagName("img")[0]
    .parentElement.parentElement.click();

  await sleep(2000);

  console.log("[remove-liked-post] Disliking post");
  document
    .querySelector('[aria-label="Ya no me gusta"]')
    .parentElement.parentElement.click();

  await sleep(1000);

  console.log("[remove-liked-post] Closing post");
  window.history.go(-1);
};

const removeLikedPosts = async () => {
  const MAX_INTERATIONS = 100;
  let i = 0;

  while (!!getPostCount() && i < MAX_INTERATIONS) {
    try {
      await remove(i);
    } catch (error) {
      console.log(`[remove-liked-post] ${error}`);
    }

    await sleep(3000);
    console.log("[remove-liked-post] reload finished");

    i++;
  }
  console.log(`[remove-liked-post] finished. removed ${i} posts`);
};

removeLikedPosts();
