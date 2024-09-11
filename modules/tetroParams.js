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
	]
];
// テトロミノの色
const TETRO_COLORS = [
  "", // 0.空っぽ	// 0.空っぽ(ブロックの存在有無を 0/1 で判定しているため`0`を利用すると都合が悪い)
  "#690202", // 赤気味
  "#946134", // オレンジ気味
  "#003669", // 青気味
  "#d2fbfc", // 水色気味
  "#0c6569", // 緑気味
  "#676902", // 黄色気味
  "#460c69", // 紫気味
];

export { 
  BASIC_TETRO_SIZE, 
  TETRO_TYPES, 
  TETRO_COLORS 
};
