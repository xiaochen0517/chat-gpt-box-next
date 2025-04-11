export class StrUtil {

  public static isNullOrEmpty(str: string): boolean {
    return str === null || str === undefined || str === "";
  }

  public static isNullOrBlank(str: string): boolean {
    return str === null || str === undefined || str.trim() === "";
  }

  public static isNotEmpty(str: string): boolean {
    return str !== null && str !== undefined && str !== "";
  }

  public static isNotBlank(str: string): boolean {
    return str !== null && str !== undefined && str.trim() !== "";
  }
}