% resume.cls - A Class for a classic, readable resume.
\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{resume}[2025/07/17 A readable, spacious resume class]
% --- 修改点: 字体改回 11pt，让所有文字更大 ---
\LoadClass[11pt]{article}

% --- 核心宏包 ---
\RequirePackage{xltxtra}
\RequirePackage{xifthen}
\RequirePackage{fontawesome}
\RequirePackage[usenames,dvipsnames]{xcolor}
\RequirePackage{fontspec}
\RequirePackage{graphicx}
\RequirePackage{titlesec}
\RequirePackage{enumitem}
\RequirePackage{setspace}

% --- 页面布局与边距 ---
% --- 修改点: 恢复并略微增大了边距，增加留白 ---
\RequirePackage[
	a4paper,
	left=0.6in,
	right=0.6in,
	top=0.5in,
	bottom=0.5in,
	nohead
]{geometry}

% --- 全局间距 ---
\setlength{\parindent}{0pt}
% --- 修改点: 将行距从压缩状态恢复到更宽松的1.05倍 ---
\setstretch{1.15}

% --- 字体设置 ---
\setmainfont[
  Path = fonts/Main/ ,
  Extension = .otf ,
  UprightFont = *-regular ,
  BoldFont = *-bold ,
  ItalicFont = *-italic ,
  BoldItalicFont = *-bolditalic ,
  SmallCapsFont = Fontin-SmallCaps
]{texgyretermes}
% \setmainfont{Times New Roman} % 备用字体

% --- 列表间距 ---
% --- 修改点: 从最紧凑的 nosep 改回 noitemsep，让列表整体有呼吸感 ---
\setlist{noitemsep}
\setlist[itemize]{topsep=0.5em, itemsep=0.3em, leftmargin=1.5pc}

% --- 章节标题间距 ---
% --- 修改点: 增加了标题前后的间距 ---
\titleformat{\section}
  {\Large\scshape\raggedright}
  {}{0em}{}
  [\titlerule]
\titlespacing*{\section}{0cm}{*1.8}{*1.2}

\titleformat{\subsection}
  {\large\raggedright}
  {}{0em}{}
\titlespacing*{\subsection}{0cm}{*1.0}{*0.8}

% --- 自定义命令 ---
% --- 修改点: 增加了所有自定义命令的垂直间距 ---
\newcommand{\datedsection}[2]{%
  \section[#1]{#1 \hfill #2}%
}
\newcommand{\datedsubsection}[2]{%
  \subsection[#1]{#1 \hfill #2}%
}
\newcommand{\datedline}[2]{%
  {\par #1 \hfill #2 \par}%
}
\newcommand{\name}[1]{
  \centerline{\Huge\scshape{#1}}
  \vspace{1.5ex}
}
\newcommand{\contactInfo}[2]{
  \centerline{\sffamily\large{\faPhone\ {#1} \textperiodcentered\ \faEnvelope\ {#2}}}
  \vspace{1.0ex}
}
\newcommand{\info}[4]{
  \centerline{\sffamily\large{\ {#1}}
    \ifthenelse{\isempty{#2}}{}{{\textperiodcentered\ \ {#2}}}
    \ifthenelse{\isempty{#3}}{}{{\textperiodcentered\ \ {#3}}}
    \ifthenelse{\isempty{#4}}{}{{\textperiodcentered\ \ {#4}}}
  }
  \vspace{1.2ex}
}

\newcommand{\role}[2]{
  {\par\textit{#1} ~ #2\par}
  \vspace{0.5ex}
}