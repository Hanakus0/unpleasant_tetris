//テトロミノのサイズ
const BASIC_TETRO_SIZE = 4;
// テトロミノの形式情報
const TETRO_TYPES = [
	[],	// 0.空っぽ	// 0.空っぽ(ブロックの存在有無を 0/1 で判定しているため`0`を利用すると都合が悪い)
	[					// 1.I
		[ 0, 0, 0, 0 ],
		[ 1, 1, 1, 1 ],
		[ 0, 0, 0, 0 ],
		[ 0, 0, 0, 0 ]
	],
	[					// 2.L
		[ 0, 1, 0, 0 ],
		[ 0, 1, 0, 0 ],
		[ 0, 1, 1, 0 ],
		[ 0, 0, 0, 0 ]
	],
	[					// 3.J
		[ 0, 0, 1, 0 ],
		[ 0, 0, 1, 0 ],
		[ 0, 1, 1, 0 ],
		[ 0, 0, 0, 0 ]
	],
	[					// 4.T
		[ 0, 1, 0, 0 ],
		[ 0, 1, 1, 0 ],
		[ 0, 1, 0, 0 ],
		[ 0, 0, 0, 0 ]
	],
	[					// 5.O
		[ 0, 0, 0, 0 ],
		[ 0, 1, 1, 0 ],
		[ 0, 1, 1, 0 ],
		[ 0, 0, 0, 0 ]
	],
	[					// 6.Z
		[ 0, 0, 0, 0 ],
		[ 1, 1, 0, 0 ],
		[ 0, 1, 1, 0 ],
		[ 0, 0, 0, 0 ]
	],
	[					// 7.S
		[ 0, 0, 0, 0 ],
		[ 0, 1, 1, 0 ],
		[ 1, 1, 0, 0 ],
		[ 0, 0, 0, 0 ]
	],
	// STRANGE
	[					// 8.ビッグZ
		[ 1, 1, 1, 1 ],
		[ 0, 0, 1, 0 ],
		[ 0, 1, 0, 0 ],
		[ 1, 1, 1, 1 ]
	]
	,[					// 9.O
		[ 1, 1, 1, 1 ],
		[ 1, 0, 0, 1 ],
		[ 1, 0, 0, 1 ],
		[ 1, 1, 1, 1 ]
	]
	,[					// 10.虫
		[ 0, 1, 0, 1 ],
		[ 1, 0, 1, 0 ],
		[ 0, 1, 0, 1 ],
		[ 1, 0, 1, 0 ]
	]
	,[					// 11.天ぷら
		[ 0, 1, 0, 0 ],
		[ 1, 1, 1, 0 ],
		[ 0, 1, 1, 1 ],
		[ 0, 0, 1, 0 ]
	]
	,[					// 12.ゴミ
		[ 1, 0, 0, 1 ],
		[ 0, 1, 1, 0 ],
		[ 0, 1, 0, 1 ],
		[ 1, 0, 1, 1 ]
	]
];
// テトロミノの色
const TETRO_COLORS = [
  "", // 0.空っぽ	// 0.空っぽ(ブロックの存在有無を 0/1 で判定しているため`0`を利用すると都合が悪い)
	// BASIC
  "#690202", // 赤気味:1
  "#946134", // オレンジ気味:2
  "#003669", // 青気味:3
  "#d2fbfc", // 水色気味:4
  "#0c6569", // 緑気味:5
  "#676902", // 黄色気味:6
  "#460c69", // 紫気味:7
	// LARGE
	"#f5f5dc", // ベージュ:8
	"#00ffff", // シアン:9
	"#8b4513", // サドルブラウン:10
	"#808000", // オリーブ:11
	"#ff00ff", // マゼンタ:12
];

export { 
	BASIC_TETRO_SIZE, 
	TETRO_TYPES, 
	TETRO_COLORS 
};
