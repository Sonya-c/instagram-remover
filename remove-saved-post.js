const getPostCount = () =>
  document.getElementsByTagName("article")[0].getElementsByTagName("a").length;

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const remove = async (i) => {
  console.log("[remove-saved-post] Openining post");
  document
    .getElementsByTagName("article")[0]
    .getElementsByTagName("a")
    [i].click();

  await sleep(300);

  console.log("[remove-saved-post] Unsaving post");
  document
    .querySelector('[aria-label="Suprimir"]')
    .parentElement.parentElement.click();

  await sleep(300);

  console.log("[remove-saved-post] Closing post");
  document
    .querySelector('[aria-label="Cerrar"]')
    .parentElement.parentElement.click();

  await sleep(300);
};

const removeSavedPost = async () => {
  const MAX_INTERATIONS = 100;
  let i = 0;

  while (!!getPostCount() && i < MAX_INTERATIONS) {
    try {
      await remove(i);
    } catch (error) {
      console.log(`[remove-saved-post] ${error}`);
    }

    if (i >= getPostCount() - 10) {
      console.log("[remove-saved-post] Scrolling down");
      window.scrollBy(0, 1000);
      await sleep(900);
    }

    i++;
  }
  console.log(`finished. removed ${i} posts`);
};

removeSavedPost();
