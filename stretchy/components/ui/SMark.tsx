'use client';

// The Stretchy S logomark — traced from the brand PNG.
// Path data is the same pixel-art rasterized path from the design prototype.

const S_PATH =
  'M0 172h18v1h-18zM0 173h19v1h-19zM0 174h20v1h-20zM0 175h21v1h-21zM0 176h22v2h-22zM0 178h23v1h-23zM0 179h24v1h-24zM0 180h25v1h-25zM0 181h26v2h-26zM0 183h27v1h-27zM0 184h28v1h-28zM0 185h29v2h-29zM0 187h30v1h-30zM0 188h31v1h-31zM0 189h32v1h-32zM0 190h33v1h-33zM1 167h13v1h-13zM1 168h14v1h-14zM1 169h15v1h-15zM1 170h16v2h-16zM1 191h33v2h-33zM1 193h34v1h-34zM1 194h35v1h-35zM1 195h36v1h-36zM1 196h37v1h-37zM1 197h38v1h-38zM1 84h175v1h-175zM1 85h176v1h-176zM1 86h178v1h-178zM1 87h179v1h-179zM1 88h181v1h-181zM1 89h182v1h-182zM1 90h183v1h-183zM1 91h184v1h-184zM2 163h8v1h-8zM2 164h9v1h-9zM2 165h10v1h-10zM2 166h11v1h-11zM2 79h34v1h-34zM2 80h38v1h-38zM2 198h38v1h-38zM2 199h39v1h-39zM2 200h40v1h-40zM2 201h41v1h-41zM2 202h42v1h-42zM2 81h44v1h-44zM2 82h170v1h-170zM2 83h172v1h-172zM2 92h185v1h-185zM2 93h186v1h-186zM2 94h187v1h-187zM2 95h188v1h-188zM2 96h189v2h-189zM2 98h190v1h-190zM3 162h6v1h-6zM3 76h28v1h-28zM3 77h29v1h-29zM3 78h31v1h-31zM3 203h42v1h-42zM3 204h44v1h-44zM3 205h45v1h-45zM3 206h46v1h-46zM3 99h190v1h-190zM3 100h191v1h-191zM3 101h192v1h-192zM3 102h193v2h-193zM4 161h3v1h-3zM4 74h24v1h-24zM4 75h25v1h-25zM4 207h47v1h-47zM4 208h49v1h-49zM4 209h50v1h-50zM4 104h193v1h-193zM4 105h194v2h-194zM4 107h195v1h-195zM4 108h196v1h-196z';

interface SMarkProps {
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function SMark({ size = 32, color = 'currentColor', className, style }: SMarkProps) {
  return (
    <div
      className={className}
      style={{ width: size, height: size, display: 'inline-block', color, flexShrink: 0, ...style }}
    >
      <svg
        viewBox="0 0 220 257"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        style={{ display: 'block' }}
      >
        <path d={S_PATH} fill="currentColor" />
      </svg>
    </div>
  );
}
