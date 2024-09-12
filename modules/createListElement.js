export default function(playMode, modeFlag) {
  document.getElementById('display_mode').style.visibility = "visible";
  if (modeFlag) {
    // 可視化（重複しても問題無いためモード毎に呼び出し）
    document.getElementById(playMode).style.visibility = "visible";
  } else {
    document.getElementById(playMode).style.visibility = "hidden";
  }
}
