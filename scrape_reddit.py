#!/usr/bin/env python3
"""Scrape Reddit topics via RSS and HTML scraping."""
import json
import urllib.request
import re
import sys

def fetch_rss(url):
    """Fetch and parse RSS feed."""
    req = urllib.request.Request(url, headers={
        "User-Agent": "home-stories-blog/1.0 (by /u/home_stories_bot)",
        "Accept": "application/rss+xml, application/xml, text/xml, */*"
    })
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            return resp.read().decode("utf-8")
    except Exception as e:
        return None

def parse_rss_html(html):
    """Extract post titles and metadata from Reddit RSS-style HTML."""
    results = []
    # Look for post elements
    # Try to extract titles from <a class="title" ...> or similar patterns
    # Reddit RSS has title links
    titles = re.findall(r'<a[^>]+class="[^"]*title[^"]*"[^>]*>([^<]+)</a>', html)
    if titles:
        for t in titles[:15]:
            results.append(t.strip())
    
    # Also try a broader pattern
    if not results:
        # Try finding all links with titles
        title_links = re.findall(r'<a[^>]+>([^<]{10,200})</a>', html)
        results = title_links[:20]
    
    return results

def scrape_reddit_old(url, limit=15):
    """Scrape old.reddit.com HTML for posts."""
    req = urllib.request.Request(url, headers={
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5"
    })
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            html = resp.read().decode("utf-8")
        # Extract post titles - Reddit HTML uses data-title attribute and title links
        # Pattern: links in entries with class "may-blank"
        titles = re.findall(r'data-title="([^"]*)"', html)
        if len(titles) > limit:
            titles = titles[:limit]
        return titles
    except Exception as e:
        return []

# Try multiple approaches
SUBREDDITS = ["HomeImprovement", "DIY", "Renovations", "FirstTimeHomeBuyer"]
SUBLIST = ["HomeMaintenance", "centuryhomes", "InteriorDesign"]

for sub in SUBREDDITS:
    print(f"== r/{sub} ==")
    
    # Try old.reddit.com
    titles = scrape_reddit_old(f"https://old.reddit.com/r/{sub}/top/?sort=top&t=week", 15)
    if titles:
        for t in titles:
            print(f"  {t[:120]}")
    else:
        # Try RSS
        rss_html = fetch_rss(f"https://old.reddit.com/r/{sub}/top/.rss?t=week&limit=15")
        if rss_html:
            titles = parse_rss_html(rss_html)
            if titles:
                for t in titles:
                    print(f"  {t[:120]}")
            else:
                print("  (RSS returned but no titles extracted)")
        else:
            print("  (fetch failed)")
    print()