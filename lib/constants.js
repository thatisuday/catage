// supported image formats
exports.IMAGE_FORMATS = {
    SVG: 'svg',
    PNG: 'png',
    JPG: 'jpg',
    JPEG: 'jpeg'
};

// supported langages to highlight
exports.LANGUAGES = {
    "1C": "1c",
    "ABNF": "abnf",
    "ACCESSLOG": "accesslog",
    "ACTIONSCRIPT": "actionscript",
    "ADA": "ada",
    "ANGELSCRIPT": "angelscript",
    "APACHE": "apache",
    "APPLESCRIPT": "applescript",
    "ARCADE": "arcade",
    "ARDUINO": "arduino",
    "ARMASM": "armasm",
    "ASCIIDOC": "asciidoc",
    "ASPECTJ": "aspectj",
    "AUTOHOTKEY": "autohotkey",
    "AUTOIT": "autoit",
    "AVRASM": "avrasm",
    "AWK": "awk",
    "AXAPTA": "axapta",
    "BASH": "bash",
    "BASIC": "basic",
    "BNF": "bnf",
    "BRAINFUCK": "brainfuck",
    "CAL": "cal",
    "CAPNPROTO": "capnproto",
    "CEYLON": "ceylon",
    "CLEAN": "clean",
    "CLOJURE_REPL": "clojure-repl",
    "CLOJURE": "clojure",
    "CMAKE": "cmake",
    "COFFEESCRIPT": "coffeescript",
    "COQ": "coq",
    "COS": "cos",
    "CPP": "cpp",
    "CRMSH": "crmsh",
    "CRYSTAL": "crystal",
    "CS": "cs",
    "CSP": "csp",
    "CSS": "css",
    "D": "d",
    "DART": "dart",
    "DELPHI": "delphi",
    "DIFF": "diff",
    "DJANGO": "django",
    "DNS": "dns",
    "DOCKERFILE": "dockerfile",
    "DOS": "dos",
    "DSCONFIG": "dsconfig",
    "DTS": "dts",
    "DUST": "dust",
    "EBNF": "ebnf",
    "ELIXIR": "elixir",
    "ELM": "elm",
    "ERB": "erb",
    "ERLANG_REPL": "erlang-repl",
    "ERLANG": "erlang",
    "EXCEL": "excel",
    "FIX": "fix",
    "FLIX": "flix",
    "FORTRAN": "fortran",
    "FSHARP": "fsharp",
    "GAMS": "gams",
    "GAUSS": "gauss",
    "GCODE": "gcode",
    "GHERKIN": "gherkin",
    "GLSL": "glsl",
    "GML": "gml",
    "GO": "go",
    "GOLO": "golo",
    "GRADLE": "gradle",
    "GROOVY": "groovy",
    "HAML": "haml",
    "HANDLEBARS": "handlebars",
    "HASKELL": "haskell",
    "HAXE": "haxe",
    "HSP": "hsp",
    "HTMLBARS": "htmlbars",
    "HTTP": "http",
    "HY": "hy",
    "INFORM7": "inform7",
    "INI": "ini",
    "IRPF90": "irpf90",
    "ISBL": "isbl",
    "JAVA": "java",
    "JAVASCRIPT": "javascript",
    "JBOSS_CLI": "jboss-cli",
    "JSON": "json",
    "JULIA_REPL": "julia-repl",
    "JULIA": "julia",
    "KOTLIN": "kotlin",
    "LASSO": "lasso",
    "LDIF": "ldif",
    "LEAF": "leaf",
    "LESS": "less",
    "LISP": "lisp",
    "LIVECODESERVER": "livecodeserver",
    "LIVESCRIPT": "livescript",
    "LLVM": "llvm",
    "LSL": "lsl",
    "LUA": "lua",
    "MAKEFILE": "makefile",
    "MARKDOWN": "markdown",
    "MATHEMATICA": "mathematica",
    "MATLAB": "matlab",
    "MAXIMA": "maxima",
    "MEL": "mel",
    "MERCURY": "mercury",
    "MIPSASM": "mipsasm",
    "MIZAR": "mizar",
    "MOJOLICIOUS": "mojolicious",
    "MONKEY": "monkey",
    "MOONSCRIPT": "moonscript",
    "N1QL": "n1ql",
    "NGINX": "nginx",
    "NIMROD": "nimrod",
    "NIX": "nix",
    "NSIS": "nsis",
    "OBJECTIVEC": "objectivec",
    "OCAML": "ocaml",
    "OPENSCAD": "openscad",
    "OXYGENE": "oxygene",
    "PARSER3": "parser3",
    "PERL": "perl",
    "PF": "pf",
    "PGSQL": "pgsql",
    "PHP": "php",
    "PLAINTEXT": "plaintext",
    "PONY": "pony",
    "POWERSHELL": "powershell",
    "PROCESSING": "processing",
    "PROFILE": "profile",
    "PROLOG": "prolog",
    "PROPERTIES": "properties",
    "PROTOBUF": "protobuf",
    "PUPPET": "puppet",
    "PUREBASIC": "purebasic",
    "PYTHON": "python",
    "Q": "q",
    "QML": "qml",
    "R": "r",
    "REASONML": "reasonml",
    "RIB": "rib",
    "ROBOCONF": "roboconf",
    "ROUTEROS": "routeros",
    "RSL": "rsl",
    "RUBY": "ruby",
    "RULESLANGUAGE": "ruleslanguage",
    "RUST": "rust",
    "SAS": "sas",
    "SCALA": "scala",
    "SCHEME": "scheme",
    "SCILAB": "scilab",
    "SCSS": "scss",
    "SHELL": "shell",
    "SMALI": "smali",
    "SMALLTALK": "smalltalk",
    "SML": "sml",
    "SQF": "sqf",
    "SQL": "sql",
    "STAN": "stan",
    "STATA": "stata",
    "STEP21": "step21",
    "STYLUS": "stylus",
    "SUBUNIT": "subunit",
    "SWIFT": "swift",
    "TAGGERSCRIPT": "taggerscript",
    "TAP": "tap",
    "TCL": "tcl",
    "TEX": "tex",
    "THRIFT": "thrift",
    "TP": "tp",
    "TWIG": "twig",
    "TYPESCRIPT": "typescript",
    "VALA": "vala",
    "VBNET": "vbnet",
    "VBSCRIPT_HTML": "vbscript-html",
    "VBSCRIPT": "vbscript",
    "VERILOG": "verilog",
    "VHDL": "vhdl",
    "VIM": "vim",
    "X86ASM": "x86asm",
    "XL": "xl",
    "XML": "xml",
    "XQUERY": "xquery",
    "YAML": "yaml",
    "ZEPHIR": "zephir"
};

// supported terminal themes
exports.THEMES = {
    "3024_DAY": "3024 Day",
    "3024_NIGHT": "3024 Night",
    "ADVENTURETIME": "AdventureTime",
    "AFTERGLOW": "Afterglow",
    "ALIENBLOOD": "AlienBlood",
    "ANDROMEDA": "Andromeda",
    "ARGONAUT": "Argonaut",
    "ARTHUR": "Arthur",
    "ATELIERSULPHURPOOL": "AtelierSulphurpool",
    "ATOM": "Atom",
    "ATOMONELIGHT": "AtomOneLight",
    "AYU_LIGHT": "ayu_light",
    "AYU": "ayu",
    "BATMAN": "Batman",
    "BELAFONTE_DAY": "Belafonte Day",
    "BELAFONTE_NIGHT": "Belafonte Night",
    "BIRDSOFPARADISE": "BirdsOfParadise",
    "BLAZER": "Blazer",
    "BLULOCODARK": "BlulocoDark",
    "BLULOCOLIGHT": "BlulocoLight",
    "BORLAND": "Borland",
    "BRIGHT_LIGHTS": "Bright Lights",
    "BROADCAST": "Broadcast",
    "BROGRAMMER": "Brogrammer",
    "BUILTIN_DARK": "Builtin Dark",
    "BUILTIN_LIGHT": "Builtin Light",
    "BUILTIN_PASTEL DARK": "Builtin Pastel Dark",
    "BUILTIN_SOLARIZED DARK": "Builtin Solarized Dark",
    "BUILTIN_SOLARIZED LIGHT": "Builtin Solarized Light",
    "BUILTIN_TANGO DARK": "Builtin Tango Dark",
    "BUILTIN_TANGO LIGHT": "Builtin Tango Light",
    "C64": "C64",
    "CALAMITY": "Calamity",
    "CHALK": "Chalk",
    "CHALKBOARD": "Chalkboard",
    "CHALLENGERDEEP": "ChallengerDeep",
    "CHESTER": "Chester",
    "CIAPRE": "Ciapre",
    "CLRS": "CLRS",
    "COBALT_NEON": "Cobalt Neon",
    "COBALT2": "Cobalt2",
    "CRAYONPONYFISH": "CrayonPonyFish",
    "CYBERPUNK": "cyberpunk",
    "DARK_PASTEL": "Dark Pastel",
    "DARK+": "Dark+",
    "DARKSIDE": "Darkside",
    "DEEP": "deep",
    "DESERT": "Desert",
    "DIMMEDMONOKAI": "DimmedMonokai",
    "DOTGOV": "DotGov",
    "DRACULA": "Dracula",
    "DUOTONE_DARK": "Duotone Dark",
    "EARTHSONG": "Earthsong",
    "ELEMENTAL": "Elemental",
    "ELEMENTARY": "Elementary",
    "ENCOM": "ENCOM",
    "ESPRESSO_LIBRE": "Espresso Libre",
    "ESPRESSO": "Espresso",
    "FAHRENHEIT": "Fahrenheit",
    "FIDELOPER": "Fideloper",
    "FIREFOXDEV": "FirefoxDev",
    "FIREWATCH": "Firewatch",
    "FISHTANK": "FishTank",
    "FLAT": "Flat",
    "FLATLAND": "Flatland",
    "FLORAVERSE": "Floraverse",
    "FORESTBLUE": "ForestBlue",
    "FRAMER": "Framer",
    "FRONTENDDELIGHT": "FrontEndDelight",
    "FUNFORREST": "FunForrest",
    "GALAXY": "Galaxy",
    "GITHUB": "Github",
    "GLACIER": "Glacier",
    "GRAPE": "Grape",
    "GRASS": "Grass",
    "GRUVBOX_DARK": "Gruvbox Dark",
    "HACKTOBER": "Hacktober",
    "HARDCORE": "Hardcore",
    "HARPER": "Harper",
    "HIGHWAY": "Highway",
    "HIPSTER_GREEN": "Hipster Green",
    "HOMEBREW": "Homebrew",
    "HOPSCOTCH_256": "Hopscotch.256",
    "HOPSCOTCH": "Hopscotch",
    "HURTADO": "Hurtado",
    "HYBRID": "Hybrid",
    "IC_GREEN_PPL": "IC_Green_PPL",
    "IC_ORANGE_PPL": "IC_Orange_PPL",
    "IDEA": "idea",
    "IDLETOES": "idleToes",
    "IR_BLACK": "IR_Black",
    "JACKIE_BROWN": "Jackie Brown",
    "JAPANESQUE": "Japanesque",
    "JELLYBEANS": "Jellybeans",
    "JETBRAINS_DARCULA": "JetBrains Darcula",
    "KIBBLE": "Kibble",
    "KOLORIT": "Kolorit",
    "LAB_FOX": "Lab Fox",
    "LATER_THIS EVENING": "Later This Evening",
    "LAVANDULA": "Lavandula",
    "LIQUIDCARBON": "LiquidCarbon",
    "LIQUIDCARBONTRANSPARENT": "LiquidCarbonTransparent",
    "LIQUIDCARBONTRANSPARENTINVERSE": "LiquidCarbonTransparentInverse",
    "LOVELACE": "lovelace",
    "MAN_PAGE": "Man Page",
    "MATERIAL": "Material",
    "MATERIALDARK": "MaterialDark",
    "MATERIALOCEAN": "MaterialOcean",
    "MATHIAS": "Mathias",
    "MEDALLION": "Medallion",
    "MIDNIGHT_IN-MOJAVE": "midnight-in-mojave",
    "MISTERIOSO": "Misterioso",
    "MOLOKAI": "Molokai",
    "MONALISA": "MonaLisa",
    "MONOKAI_REMASTERED": "Monokai Remastered",
    "MONOKAI_SODA": "Monokai Soda",
    "MONOKAI_VIVID": "Monokai Vivid",
    "N0TCH2K": "N0tch2k",
    "NEOPOLITAN": "Neopolitan",
    "NEUTRON": "Neutron",
    "NIGHT_OWLISH LIGHT": "Night Owlish Light",
    "NIGHTLION_V1": "NightLion v1",
    "NIGHTLION_V2": "NightLion v2",
    "NOCTURNAL_WINTER": "Nocturnal Winter",
    "NOVEL": "Novel",
    "OBSIDIAN": "Obsidian",
    "OCEAN": "Ocean",
    "OCEANICMATERIAL": "OceanicMaterial",
    "OLLIE": "Ollie",
    "ONEHALFDARK": "OneHalfDark",
    "ONEHALFLIGHT": "OneHalfLight",
    "OPERATOR_MONO DARK": "Operator Mono Dark",
    "PANDORA": "Pandora",
    "PARASIO_DARK": "Parasio Dark",
    "PAULMILLR": "PaulMillr",
    "PENCILDARK": "PencilDark",
    "PENCILLIGHT": "PencilLight",
    "PIATTO_LIGHT": "Piatto Light",
    "PNEVMA": "Pnevma",
    "PRIMARY": "primary",
    "PRO_LIGHT": "Pro Light",
    "PRO": "Pro",
    "PURPLE_RAIN": "Purple Rain",
    "PURPLEPETER": "purplepeter",
    "REBECCA": "rebecca",
    "RED_ALERT": "Red Alert",
    "RED_PLANET": "Red Planet",
    "RED_SANDS": "Red Sands",
    "RELAXED": "Relaxed",
    "RIPPEDCASTS": "Rippedcasts",
    "ROYAL": "Royal",
    "RYUUKO": "Ryuuko",
    "SEAFOAM_PASTEL": "Seafoam Pastel",
    "SEASHELLS": "SeaShells",
    "SETI": "Seti",
    "SHADES_OF-PURPLE": "shades-of-purple",
    "SHAMAN": "Shaman",
    "SLATE": "Slate",
    "SMYCK": "Smyck",
    "SNAZZY": "Snazzy",
    "SOFTSERVER": "SoftServer",
    "SOLARIZED_DARCULA": "Solarized Darcula",
    "SOLARIZED_DARK - PATCHED": "Solarized Dark - Patched",
    "SOLARIZED_DARK HIGHER CONTRAST": "Solarized Dark Higher Contrast",
    "SPACEDUST": "Spacedust",
    "SPACEGRAY_EIGHTIES DULL": "SpaceGray Eighties Dull",
    "SPACEGRAY_EIGHTIES": "SpaceGray Eighties",
    "SPACEGRAY": "SpaceGray",
    "SPIDERMAN": "Spiderman",
    "SPRING": "Spring",
    "SQUARE": "Square",
    "SUBLIMINAL": "Subliminal",
    "SUNDRIED": "Sundried",
    "SYMFONIC": "Symfonic",
    "SYNTHWAVE": "synthwave",
    "TANGO_ADAPTED": "Tango Adapted",
    "TANGO_HALF ADAPTED": "Tango Half Adapted",
    "TEERB": "Teerb",
    "TERMINAL_BASIC": "Terminal Basic",
    "THAYER_BRIGHT": "Thayer Bright",
    "THE_HULK": "The Hulk",
    "TOMORROW_NIGHT BLUE": "Tomorrow Night Blue",
    "TOMORROW_NIGHT BRIGHT": "Tomorrow Night Bright",
    "TOMORROW_NIGHT BURNS": "Tomorrow Night Burns",
    "TOMORROW_NIGHT EIGHTIES": "Tomorrow Night Eighties",
    "TOMORROW_NIGHT": "Tomorrow Night",
    "TOMORROW": "Tomorrow",
    "TOYCHEST": "ToyChest",
    "TREEHOUSE": "Treehouse",
    "TWILIGHT": "Twilight",
    "UBUNTU": "Ubuntu",
    "ULTRAVIOLENT": "UltraViolent",
    "UNDERTHESEA": "UnderTheSea",
    "UNIKITTY": "Unikitty",
    "URPLE": "Urple",
    "VAUGHN": "Vaughn",
    "VIBRANTINK": "VibrantInk",
    "VIOLET_DARK": "Violet Dark",
    "VIOLET_LIGHT": "Violet Light",
    "WARMNEON": "WarmNeon",
    "WEZ": "Wez",
    "WHIMSY": "Whimsy",
    "WILDCHERRY": "WildCherry",
    "WOMBAT": "Wombat",
    "WRYAN": "Wryan",
    "ZENBURN": "Zenburn"
};

// default terminal theme colors
exports.DEFAULT_THEME_COLORS = {
    black: '#000000',
    red: '#B22222',
    green: '#32CD32',
    yellow: '#DAA520',
    blue: '#4169E1',
    magenta: '#9932CC',
    cyan: '#008B8B',
    white: '#D3D3D3',
    gray: '#A9A9A9',
    redBright: '#FF4500',
    greenBright: '#ADFF2F',
    yellowBright: '#FFFF00',
    blueBright: '#87CEEB',
    magentaBright: '#FF00FF',
    cyanBright: '#00FFFF',
    whiteBright: '#FFFFFF',
    bgBlack: '#000000',
    bgRed: '#B22222',
    bgGreen: '#32CD32',
    bgYellow: '#DAA520',
    bgBlue: '#4169E1',
    bgMagenta: '#9932CC',
    bgCyan: '#008B8B',
    bgWhite: '#D3D3D3',
    bgGray: '#A9A9A9',
    bgRedBright: '#FF0000',
    bgGreenBright: '#ADFF2F',
    bgYellowBright: '#FFFF00',
    bgBlueBright: '#87CEEB',
    bgMagentaBright: '#FF00FF',
    bgCyanBright: '#00FFFF',
    bgWhiteBright: '#FFFFFF',
    backgroundColor: 'transparent',
    foregroundColor: '#FAFAFA'
};

// ANSI color names map
exports.ANSI_COLOR_MAP = {
    black: 'Ansi 0 Color',
    red: 'Ansi 1 Color',
    green: 'Ansi 2 Color',
    yellow: 'Ansi 3 Color',
    blue: 'Ansi 4 Color',
    magenta: 'Ansi 5 Color',
    cyan: 'Ansi 6 Color',
    white: 'Ansi 7 Color',

    gray: 'Ansi 8 Color',
    blackBright: 'Ansi 8 Color',
    redBright: 'Ansi 9 Color',
    greenBright: 'Ansi 10 Color',
    yellowBright: 'Ansi 11 Color',
    blueBright: 'Ansi 12 Color',
    magentaBright: 'Ansi 13 Color',
    cyanBright: 'Ansi 14 Color',
    whiteBright: 'Ansi 15 Color',

    bgBlack: 'Ansi 0 Color',
    bgRed: 'Ansi 1 Color',
    bgGreen: 'Ansi 2 Color',
    bgYellow: 'Ansi 3 Color',
    bgBlue: 'Ansi 4 Color',
    bgMagenta: 'Ansi 5 Color',
    bgCyan: 'Ansi 6 Color',
    bgWhite: 'Ansi 7 Color',

    bgGray: 'Ansi 8 Color',
    bgBlackBright: 'Ansi 8 Color',
    bgRedBright: 'Ansi 9 Color',
    bgGreenBright: 'Ansi 10 Color',
    bgYellowBright: 'Ansi 11 Color',
    bgBlueBright: 'Ansi 12 Color',
    bgMagentaBright: 'Ansi 13 Color',
    bgCyanBright: 'Ansi 14 Color',
    bgWhiteBright: 'Ansi 15 Color',

    backgroundColor: 'Background Color',
    foregroundColor: 'Foreground Color'
};
