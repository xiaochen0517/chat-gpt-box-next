export class StrUtil {

  public static isNullOrEmpty(str?: string | null): boolean {
    return str === null || str === undefined || str === "";
  }

  public static isNullOrBlank(str?: string | null): boolean {
    return str === null || str === undefined || str.trim() === "";
  }

  public static isNotEmpty(str?: string | null): boolean {
    return str !== null && str !== undefined && str !== "";
  }

  public static isNotBlank(str?: string | null): boolean {
    return str !== null && str !== undefined && str.trim() !== "";
  }
}