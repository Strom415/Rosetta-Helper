const selection = figma.currentPage.selection;
let metadata = [];

class MetadataNode {
  constructor(figmaNode) {
    this.id = figmaNode.id;
    this.characters = figmaNode.characters;
    this.key = figmaNode.getPluginData("key") || genKeyName(figmaNode);
    this.description = figmaNode.getPluginData("description") || "";
    this.repo = figmaNode.getPluginData("repo") || "";
    this.y = figmaNode.absoluteTransform[1][2]
  }
}

const getText = node => {
  if (isTextNode(node)) {
    metadata.push(new MetadataNode(node));
  }

  if ('children' in node && node.visible === true) {
    node.children.forEach(childNode => getText(childNode));
  }
}

const saveMetadata = metadata => {
  metadata.forEach(node => {
    let figmaNode = figma.getNodeById(node.id);
    figmaNode.setPluginData("key", node.key);
    figmaNode.setPluginData("description", node.description);
    figmaNode.setPluginData("repo", node.repo);
  }); 
}

const sortMetadata = metadata => {
  let screens = sortByRootFrame(metadata);
  return sortScreensByY(screens);
}

const sortScreensByY = screens => 
  Object.keys(screens).reduce((acc, screen) => 
    acc.concat(screens[screen].sort((a, b) => a.y - b.y)), []);

const sortByRootFrame = metadata => {
  let screens = {};
  metadata.forEach(node => {
    const figmaNode = figma.getNodeById(node.id);
    const root = getRootFrame(figmaNode);
    screens[root] = screens[root] === undefined ? [node] : screens[root].concat(node);
  });
  return screens;
}

const getRootFrame = node => {
  if (node.parent.type === "PAGE") return node.id;
  return getRootFrame(node.parent);
}

const isTextNode = node => (
  node.type === 'TEXT' && 
  node.visible === true && 
  node.lineHeight.value !== 0 && 
  node.fontName.family !== "Carbon Icons" && 
  !isNumber(node)
);

const isNumber = node => node.characters.match(/[a-z]/i) === null;

const genKeyName = node => 
  (node.parent !== null && node.parent.type !== "PAGE") ?
  genKeyName(node.parent) + `.${node.name}` : node.name;

selection.forEach(node => getText(node));
metadata = sortMetadata(metadata);

figma.showUI(__html__)

figma.ui.postMessage({ action: 'metadata', metadata });

figma.ui.onmessage = msg => {
  if (msg.type === 'resize') {
    figma.ui.resize(msg.width * .75, 500)
  }

  if (msg.type === 'resizeInfo') {
    figma.ui.resize(500, 500)
  }

  if (msg.type === 'resizeError') {
    figma.ui.resize(520, 240)
  }

  if (msg.type === 'save') {
    saveMetadata(msg.metadata);
    figma.closePlugin();
  }

  if (msg.type === 'export') {
    saveMetadata(msg.metadata);
  }

  if (msg.type === 'close') {
    figma.closePlugin();
  }
}