#!/usr/bin/env python3
"""Check Google News RSS for home improvement topics."""
import urllib.request
import xml.etree.ElementTree as ET

query = "home renovation improvement planning"
url = f"https://news.google.com/rss/search?q={urllib.parse.quote(query)}&hl=en-US&gl=US&ceid=US:en"

try:
    req = urllib.request.Request(url, headers={
        "User-Agent": "home-stories-blog/1.0",
    })
    with urllib.request.urlopen(req, timeout=15) as resp:
        xml = resp.read()
    root = ET.fromstring(xml)
    items = root.findall(".//item")
    for i, item in enumerate(items[:20]):
        title = item.find("title").text
        link = item.find("link").text
        print(f"{i+1}. {title[:100]}")
        if "reddit" in link:
            print(f"   (reddit: {link[:100]})")
        print()
except Exception as e:
    print(f"Error: {e}")