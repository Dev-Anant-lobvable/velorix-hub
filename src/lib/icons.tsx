import React from "react";
import * as Iconsax from "iconsax-react";
import {
  Bug as LBug,
  Crosshair as LCrosshair,
  Swords as LSwords,
  Cookie as LCookie,
  GripVertical as LGripVertical,
  Dot as LDot,
  PanelLeft as LPanelLeft,
  Circle as LCircle,
} from "lucide-react";

// Lovable design system bridge: render Iconsax (Linear variant) icons under
// the lucide-compatible names already used across the codebase.
// `color` defaults to `currentColor` so icons inherit Tailwind text colors.

export type IconProps = {
  size?: number | string;
  color?: string;
  className?: string;
  strokeWidth?: number; // accepted for lucide compatibility; ignored
  [key: string]: unknown;
};

const wrap =
  (Ic: React.ComponentType<any>): React.FC<IconProps> =>
  ({ color = "currentColor", strokeWidth: _sw, size, className, ...rest }) =>
    <Ic variant="Linear" color={color} size={size} className={className} {...rest} />;

// Permissive type so both iconsax wrappers and original lucide icons satisfy it.
export type LucideIcon = React.ComponentType<IconProps>;

// Direct iconsax mappings
export const Activity = wrap(Iconsax.Activity);
export const AlertTriangle = wrap(Iconsax.Warning2);
export const ArrowLeft = wrap(Iconsax.ArrowLeft);
export const ArrowRight = wrap(Iconsax.ArrowRight);
export const ArrowUpRight = wrap(Iconsax.Export);
export const Award = wrap(Iconsax.Award);
export const Bell = wrap(Iconsax.Notification);
export const Cable = wrap(Iconsax.Link2);
export const Calendar = wrap(Iconsax.Calendar);
export const Check = wrap(Iconsax.TickSquare);
export const CheckCircle2 = wrap(Iconsax.TickCircle);
export const ChevronDown = wrap(Iconsax.ArrowDown2);
export const ChevronUp = wrap(Iconsax.ArrowUp2);
export const ChevronLeft = wrap(Iconsax.ArrowLeft2);
export const ChevronRight = wrap(Iconsax.ArrowRight2);
export const Clock = wrap(Iconsax.Clock);
export const Clock3 = wrap(Iconsax.Clock);
export const CloudOff = wrap(Iconsax.CloudCross);
export const Crown = wrap(Iconsax.Crown);
export const Download = wrap(Iconsax.DocumentDownload);
export const DownloadCloud = wrap(Iconsax.CloudAdd);
export const ExternalLink = wrap(Iconsax.ExportSquare);
export const FileArchive = wrap(Iconsax.Folder);
export const FileText = wrap(Iconsax.DocumentText);
export const Gamepad2 = wrap(Iconsax.Gameboy);
export const Globe = wrap(Iconsax.Global);
export const HardDrive = wrap(Iconsax.Driver);
export const Headphones = wrap(Iconsax.Headphones);
export const Home = wrap(Iconsax.Home2);
export const Hourglass = wrap(Iconsax.Timer);
export const Info = wrap(Iconsax.InfoCircle);
export const Instagram = wrap(Iconsax.Instagram);
export const Lock = wrap(Iconsax.Lock);
export const LogOut = wrap(Iconsax.Logout);
export const Mail = wrap(Iconsax.Sms);
export const Menu = wrap(Iconsax.Menu);
export const MoreHorizontal = wrap(Iconsax.More);
export const Package = wrap(Iconsax.Box);
export const Plus = wrap(Iconsax.Add);
export const RadioTower = wrap(Iconsax.Radio);
export const RotateCcw = wrap(Iconsax.ArrowRotateLeft);
export const Save = wrap(Iconsax.DocumentDownload);
export const Search = wrap(Iconsax.SearchNormal1);
export const ServerCrash = wrap(Iconsax.CloudCross);
export const Shield = wrap(Iconsax.Shield);
export const ShieldAlert = wrap(Iconsax.ShieldCross);
export const ShieldCheck = wrap(Iconsax.ShieldTick);
export const Smartphone = wrap(Iconsax.Mobile);
export const Sparkles = wrap(Iconsax.MagicStar);
export const Star = wrap(Iconsax.Star);
export const Terminal = wrap(Iconsax.Code1);
export const Trash2 = wrap(Iconsax.Trash);
export const Trophy = wrap(Iconsax.Cup);
export const UserPlus = wrap(Iconsax.UserAdd);
export const Users = wrap(Iconsax.Profile);
export const WifiOff = wrap(Iconsax.WifiSquare);
export const Wrench = wrap(Iconsax.Setting2);
export const X = wrap(Iconsax.CloseSquare);
export const Zap = wrap(Iconsax.Flash);

// Icons without a clean iconsax equivalent — keep lucide for these.
export const Bug = LBug;
export const Crosshair = LCrosshair;
export const Swords = LSwords;
export const Cookie = LCookie;
export const GripVertical = LGripVertical;
export const Dot = LDot;
export const PanelLeft = LPanelLeft;
export const Circle = LCircle;